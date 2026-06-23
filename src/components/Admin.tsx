import React, { useEffect, useState } from 'react';
import { db, supabase } from '../db';
import { SurveyData } from '../types';
import { Download, Users, Briefcase, Bot, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function AdminDashboard() {
  const [responses, setResponses] = useState<SurveyData[]>([]);

  useEffect(() => {
    // Initial fetch
    db.getResponses().then(setResponses);

    // Local fallback event listener
    const handleLocalUpdate = () => {
      db.getResponses().then(setResponses);
    };
    window.addEventListener('new_survey_response', handleLocalUpdate);

    // Supabase realtime subscription
    let channel: any;
    if (supabase) {
      channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'survey_responses' },
          (payload) => {
            setResponses(prev => [payload.new as SurveyData, ...prev]);
          }
        )
        .subscribe();
    }

    return () => {
      window.removeEventListener('new_survey_response', handleLocalUpdate);
      if (channel) {
        supabase?.removeChannel(channel);
      }
    };
  }, []);

  const totalResponses = responses.length;

  // Aggregation for charts
  const getRoleData = () => {
    const counts: Record<string, number> = {};
    responses.forEach(r => {
      if (r.role) counts[r.role] = (counts[r.role] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name: name.split('/')[0].trim(), value }))
      .sort((a, b) => b.value - a.value);
  };

  const getAiData = () => {
    const counts: Record<string, number> = {};
    responses.forEach(r => {
      (r.aiCapabilities || []).forEach(ai => {
        counts[ai] = (counts[ai] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value).slice(0, 5); // Top 5
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Survey
            </a>
            <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-blue-500" />
              Insights Dashboard
            </h1>
            <p className="text-gray-500 mt-2">Real-time analysis of the 2026 Global Design Survey.</p>
          </div>
          <button 
            onClick={db.exportToCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
              <Users className="w-5 h-5 text-blue-500" /> Total Responses
            </div>
            <div className="text-4xl font-semibold tracking-tight">{totalResponses}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
              <Briefcase className="w-5 h-5 text-indigo-500" /> Most Represented Role
            </div>
            <div className="text-xl font-semibold tracking-tight truncate">
              {getRoleData()[0]?.name || 'N/A'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
              <Bot className="w-5 h-5 text-purple-500" /> Top AI Use Case
            </div>
            <div className="text-xl font-semibold tracking-tight truncate">
              {getAiData()[0]?.name || 'N/A'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Respondent Roles</h3>
            {totalResponses > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getRoleData()} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {getRoleData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3b82f6" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">No data yet</div>
            )}
          </div>

          {/* Chart 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Top AI Capabilities Replaced</h3>
            {totalResponses > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getAiData()} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={180} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {getAiData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#8b5cf6" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">No data yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
