import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { CalendarIllustration } from '../components/welcome/CalendarIllustration';
import { RoleSelection } from '../components/welcome/RoleSelection';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { LogIn } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* =========================================
          DESKTOP & TABLET LAYOUT (hidden on < 1024px)
         ========================================= */}
      <div className="hidden lg:flex flex-col min-h-screen max-w-7xl w-full mx-auto p-6 xl:p-10 justify-between">
        
        {/* Desktop Header */}
        <header className="w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-4 flex items-center justify-between">
          <InstitutionalLogos />

          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-blue-200 text-blue-600 font-bold text-sm shadow-xs transition-all hover:shadow-md cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </header>

        {/* Desktop Hero & Role Selection Content */}
        <main className="my-8 space-y-10">
          {/* Hero Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-[36px] shadow-xl border border-white/90 p-10 grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7 space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs tracking-wider uppercase border border-blue-100 shadow-2xs">
                WELCOME TO
              </span>
              <h1 className="text-5xl xl:text-6xl font-black tracking-tight text-[#14264B]">
                Sync <span className="text-[#2563EB]">Desk</span>
              </h1>
              <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl">
                Timetable Management • Live Availability • Team Collaboration
              </p>
            </div>

            <div className="col-span-5 flex justify-center">
              <CalendarIllustration />
            </div>
          </div>

          {/* Role Selection Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-[36px] shadow-xl border border-white/90 p-8">
            <RoleSelection />
          </div>
        </main>

        {/* Desktop Footer */}
        <footer className="text-center text-xs text-slate-500 py-4">
          Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
        </footer>
      </div>

      {/* =========================================
          MOBILE & TABLET PORTRAIT LAYOUT (visible on < 1024px)
         ========================================= */}
      <div className="flex lg:hidden flex-col min-h-screen w-full p-4 sm:p-6 justify-between max-w-lg mx-auto">
        
        {/* Mobile Header */}
        <header className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/mainlogo.png" alt="Sync Desk" className="h-7 w-auto object-contain" />
            <span className="font-black text-slate-900 text-base">
              Sync <span className="text-blue-600">Desk</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src="/sec.png" alt="SEC" className="h-6 w-auto object-contain" />
            <span className="text-slate-300">|</span>
            <img src="/idea.png" alt="Idea Lab" className="h-6 w-auto object-contain" />
          </div>

          <button
            onClick={() => navigate('/login')}
            className="p-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs flex items-center gap-1 shadow-2xs"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        </header>

        {/* Mobile Main Content */}
        <main className="my-6 space-y-6 flex-1 flex flex-col justify-center">
          
          {/* Mobile Hero & Branding */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 text-center space-y-4">
            <div className="flex justify-center items-center gap-3 py-1">
              <img src="/sec.png" alt="SEC" className="h-8 w-auto object-contain" />
              <div className="w-[1px] h-6 bg-slate-200"></div>
              <img src="/idea.png" alt="Idea Lab" className="h-8 w-auto object-contain" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[10px] uppercase tracking-wider">
                WELCOME TO
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#14264B]">
                Sync <span className="text-[#2563EB]">Desk</span>
              </h1>
              <p className="text-xs text-slate-600 font-medium px-2">
                Timetable Management • Live Availability • Team Collaboration
              </p>
            </div>

            <div className="py-2 flex justify-center">
              <CalendarIllustration compact />
            </div>
          </div>

          {/* Mobile Role Selection */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
            <RoleSelection compact />
          </div>
        </main>

        {/* Mobile Footer */}
        <footer className="text-center text-[11px] text-slate-500 pb-2">
          Saveetha Engineering College • AICTE Idea Lab
        </footer>

      </div>

    </div>
  );
};
