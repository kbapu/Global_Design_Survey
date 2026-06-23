import { SurveyData } from './types';

const STORAGE_KEY = 'gds_survey_responses_v1';

export const db = {
  getResponses: (): SurveyData[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  
  saveResponse: (response: Omit<SurveyData, 'id' | 'createdAt'>): SurveyData => {
    const newResponse: SurveyData = {
      ...response,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    const existing = db.getResponses();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newResponse, ...existing]));
    
    // Dispatch a custom event so the admin dashboard can update in real-time (simulated)
    window.dispatchEvent(new Event('new_survey_response'));
    
    return newResponse;
  },

  exportToCSV: () => {
    const data = db.getResponses();
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
