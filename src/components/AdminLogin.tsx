import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'DesigN123') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-5 h-5 text-gray-900" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">Admin Access</h2>
        <p className="text-gray-500 mb-8">Please enter the password to view the dashboard.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="password"
              placeholder="Password"
              className={`w-full p-4 rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${error ? 'border-red-300' : 'border-gray-200'}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2 text-left">Incorrect password.</p>}
          </div>
          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md"
          >
            Enter <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-8">
           <a href="/" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
             Return to Survey
           </a>
        </div>
      </div>
    </div>
  );
}
