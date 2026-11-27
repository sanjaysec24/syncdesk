import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { RoleCard } from '../components/welcome/RoleCard';
import { LogIn } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'admin' | 'student' | 'faculty') => {
    switchRole(role);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Outer Container (max-width ~1120px) */}
      <div className="max-w-[1120px] w-full mx-auto space-y-6 my-auto">
        
        {/* 1. Compact Institutional Header */}
        <header className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-3.5 flex items-center justify-between">
          <InstitutionalLogos compact />

          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-blue-200 text-blue-600 font-bold text-xs sm:text-sm shadow-xs transition-all hover:shadow-md cursor-pointer shrink-0"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </header>

        {/* 2. Welcome Hero Card - Entire Card is Only main-wel.png */}
        <section className="w-full h-[180px] sm:h-[220px] overflow-hidden rounded-[24px] shadow-lg shadow-indigo-950/10 border border-slate-100 bg-white p-0 m-0">
          <img
            src="/main-wel.png"
            alt="Sync Desk Welcome Hero"
            className="w-full h-full block object-cover object-center m-0 p-0"
          />
        </section>

        {/* 3. Role Selection Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Choose how you're joining
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <RoleCard
              role="admin"
              title="Admin"
              description="Create and manage desks, teams and timetables."
              onClick={() => handleRoleSelect('admin')}
            />
            <RoleCard
              role="student"
              title="Student"
              description="Join a desk and submit your timetable."
              onClick={() => handleRoleSelect('student')}
            />
            <RoleCard
              role="faculty"
              title="Faculty"
              description="Join a desk and submit your timetable."
              onClick={() => handleRoleSelect('faculty')}
            />
          </div>
        </section>

      </div>

      {/* 4. Minimal Footer */}
      <footer className="max-w-[1120px] w-full mx-auto text-center text-xs text-slate-500 py-4 mt-auto">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>
    </div>
  );
};
