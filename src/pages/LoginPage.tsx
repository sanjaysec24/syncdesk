import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { currentUser, switchRole } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/workspace');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8f7fc] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 mx-auto flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/20">
            S
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign in to Sync Desk</h2>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
            Saveetha Engineering College • {currentUser.role.toUpperCase()} Portal
          </p>
        </div>

        {/* Quick Role Switcher for Demo */}
        <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-indigo-900">Demo Account:</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => { switchRole('admin'); setEmail('rajesh.admin@saveetha.ac.in'); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${currentUser.role === 'admin' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => { switchRole('faculty'); setEmail('anitha.cse@saveetha.ac.in'); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${currentUser.role === 'faculty' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => { switchRole('student'); setEmail('212301045@saveetha.ac.in'); }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${currentUser.role === 'student' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}
            >
              Student
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">College Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Access Sync Desk</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <ShieldCheck className="w-4 h-4" /> SEC Auth Verified
          </span>
          <button onClick={() => navigate('/welcome')} className="text-indigo-600 font-bold hover:underline">
            Back to Welcome
          </button>
        </div>
      </div>
    </div>
  );
};
