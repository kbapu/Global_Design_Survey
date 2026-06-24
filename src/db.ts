import { createClient } from '@supabase/supabase-js';
import { SurveyData } from './types';

function cleanEnvValue(val: string): string {
  if (!val) return '';
  let cleaned = val.trim();
  // Strip starting/ending single or double quotes
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

let rawUrl = cleanEnvValue(import.meta.env.VITE_SUPABASE_URL);

if (rawUrl) {
  // Remove /rest/v1 if the user mistakenly provided the REST URL instead of the Project URL
  rawUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '');
  // Remove trailing slashes
  while (rawUrl.endsWith('/')) {
    rawUrl = rawUrl.slice(0, -1);
  }
  // If no protocol is specified, prepend https://
  if (rawUrl && !/^https?:\/\//i.test(rawUrl)) {
    rawUrl = 'https://' + rawUrl;
  }
}

const supabaseUrl = rawUrl;
const supabaseKey = cleanEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

const STORAGE_KEY = 'gds_survey_responses_v1';

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const db = {
  supabaseUrl,
  isSupabaseConfigured,
  getResponses: async (): Promise<SurveyData[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) {
        console.error('Error fetching from Supabase:', error);
        return [];
      }
      return data as SurveyData[];
    } else {
      // Fallback to localStorage
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }
  },
  
  saveResponse: async (response: Omit<SurveyData, 'id' | 'createdAt'>): Promise<SurveyData | null> => {
    const newResponse: SurveyData = {
      ...response,
      id: generateUUID(),
      createdAt: new Date().toISOString(),
    };
    
    if (isSupabaseConfigured && supabase) {
      // Remove undefined values to prevent Supabase errors
      const sanitizedResponse = Object.fromEntries(
        Object.entries(newResponse).filter(([_, v]) => v !== undefined)
      );

      const { data, error } = await supabase
        .from('survey_responses')
        .insert([sanitizedResponse])
        .select();

      if (error) {
        console.error('Error saving to Supabase:', error);
        throw error;
      }
      
      // Real-time notifications handled by Supabase channels in AdminDashboard
      return data?.[0] as SurveyData;
    } else {
      // Fallback to localStorage
      const existing = await db.getResponses();
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newResponse, ...existing]));
      window.dispatchEvent(new Event('new_survey_response'));
      return newResponse;
    }
  },

  exportToCSV: async () => {
    const data = await db.getResponses();
    if (data.length === 0) return;

    const headers = [
      'Date', 'Region', 'Role', 'Top Roles to Hire', 'Custom Role', 
      'Roles Not Hiring', 'Qualities Looked For', 'AI Capabilities', 'Name', 'Email'
    ];

    const rows = data.map(r => [
      new Date(r.createdAt).toLocaleString(),
      r.region || '',
      r.role || '',
      (r.topRoles || []).join('; '),
      r.customRole || '',
      (r.rolesNotHired || []).join('; '),
      (r.qualities || []).join('; '),
      (r.aiCapabilities || []).join('; '),
      r.name || '',
      r.email || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `survey_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
