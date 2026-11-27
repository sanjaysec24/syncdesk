import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { Mail, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { currentUser, switchRole } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState(currentUser.email);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (currentUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (currentUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header with Institutional Logos */}
      <header className="max-w-[1120px] w-full mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-3.5 flex items-center justify-between">
        <InstitutionalLogos compact />
      </header>

      {/* Main Centered Login Card */}
      <main className="max-w-[500px] w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-[28px] shadow-xl shadow-indigo-950/10 border border-slate-100 p-8 sm:p-10 space-y-6">
          
          {/* Header Section */}
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[10px] uppercase tracking-wider border border-blue-100">
              WELCOME BACK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14264B] tracking-tight">
              Sign in to Sync Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Continue with your college account
            </p>
          </div>

          {/* Demo Role Switcher Tabs */}
          <div className="bg-indigo-50/60 p-2.5 rounded-2xl border border-indigo-100 flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-900">Demo Role:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => { switchRole('admin'); setEmail('rajesh.admin@saveetha.ac.in'); }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${currentUser.role === 'admin' ? 'bg-[#2563EB] text-white shadow-xs' : 'bg-white text-slate-700'}`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => { switchRole('faculty'); setEmail('anitha.cse@saveetha.ac.in'); }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${currentUser.role === 'faculty' ? 'bg-[#2563EB] text-white shadow-xs' : 'bg-white text-slate-700'}`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => { switchRole('student'); setEmail('212301045@saveetha.ac.in'); }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${currentUser.role === 'student' ? 'bg-[#2563EB] text-white shadow-xs' : 'bg-white text-slate-700'}`}
              >
                Student
              </button>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.19v3.15C3.17 21.36 7.22 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.5-.38-2.25s.13-1.53.38-2.25V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.09-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.64 1.19 6.6l4.09 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative bg-white px-4 text-xs font-semibold text-slate-400 uppercase">
              or
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer switch */}
          <div className="text-center pt-2 text-xs font-semibold text-slate-500">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-[#2563EB] font-bold hover:underline cursor-pointer">
              Create account
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1120px] w-full mx-auto text-center text-xs text-slate-500 py-4 mt-auto">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>
    </div>
  );
};
