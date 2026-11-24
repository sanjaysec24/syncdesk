import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';

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
      navigate('/workspace');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/workspace');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header with Institutional Logos */}
      <header className="max-w-7xl w-full mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-4 flex items-center justify-between">
        <InstitutionalLogos />
      </header>

      {/* Main Login Card matching the exact reference image */}
      <main className="max-w-5xl w-full mx-auto my-auto py-8">
        <div className="bg-white/95 backdrop-blur-md rounded-[40px] shadow-2xl shadow-indigo-900/10 border border-white/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Column: 3D Illustration & Soft Cloud Background */}
          <div className="lg:col-span-5 p-8 flex flex-col items-center justify-center relative bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white min-h-[400px]">
            {/* Background Soft Blob */}
            <div className="absolute w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -z-10"></div>
            <div className="absolute w-48 h-48 bg-blue-200/30 rounded-full blur-2xl -z-10 translate-x-8 -translate-y-8"></div>

            {/* 3D Calendar & Stacked Books Illustration */}
            <div className="relative flex flex-col items-center">
              {/* Calendar Card */}
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-4 shadow-xl shadow-blue-500/25 text-white w-56 border border-blue-400/35 rotate-1">
                <div className="absolute -top-3 left-12 w-3.5 h-5 bg-blue-400 rounded-full border border-blue-300"></div>
                <div className="absolute -top-3 right-12 w-3.5 h-5 bg-blue-400 rounded-full border border-blue-300"></div>

                <div className="bg-white rounded-2xl p-3 text-slate-800 shadow-inner mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-2.5 bg-blue-200 rounded-full"></div>
                    <div className="w-5 h-2.5 bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <div className="h-8 bg-slate-100 rounded-lg"></div>
                    <div className="h-8 bg-slate-100 rounded-lg"></div>
                    <div className="h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="h-8 bg-slate-100 rounded-lg"></div>
                    <div className="h-8 bg-slate-100 rounded-lg"></div>
                    <div className="h-8 bg-slate-100 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Stacked Books underneath */}
              <div className="mt-[-20px] z-10 flex flex-col items-center space-y-1">
                {/* Top Book (Purple) */}
                <div className="w-48 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl shadow-lg border-2 border-white/80 flex items-center justify-center">
                  <div className="w-8 h-1.5 bg-white/40 rounded-full"></div>
                </div>
                {/* Bottom Book (Blue) */}
                <div className="w-52 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg border-2 border-white/80 flex items-center justify-center">
                  <div className="w-10 h-1.5 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Form matching reference */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div className="text-center lg:text-left space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[11px] uppercase tracking-wider border border-blue-100">
                WELCOME BACK
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#14264B] tracking-tight">
                Sign in to Sync Desk
              </h2>
              <p className="text-sm text-slate-500 font-medium">
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
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${currentUser.role === 'admin' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700'}`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => { switchRole('faculty'); setEmail('anitha.cse@saveetha.ac.in'); }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${currentUser.role === 'faculty' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700'}`}
                >
                  Faculty
                </button>
                <button
                  type="button"
                  onClick={() => { switchRole('student'); setEmail('212301045@saveetha.ac.in'); }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${currentUser.role === 'student' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700'}`}
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
                <Mail className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
              <button onClick={() => navigate('/register')} className="text-blue-600 font-bold hover:underline cursor-pointer">
                Create account
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-slate-500 py-4">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>
    </div>
  );
};
