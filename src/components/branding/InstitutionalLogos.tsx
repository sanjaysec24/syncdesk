import React from 'react';

interface InstitutionalLogosProps {
  compact?: boolean;
}

export const InstitutionalLogos: React.FC<InstitutionalLogosProps> = ({ compact = false }) => {
  return (
    <div className={`flex items-center ${compact ? 'gap-2 scale-90 origin-left' : 'gap-4 sm:gap-6'}`}>
      {/* Sync Desk Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/mainlogo.png"
          alt="Sync Desk"
          className={`${compact ? 'h-7' : 'h-9 sm:h-10'} w-auto object-contain`}
        />
        <span className={`font-black text-slate-900 tracking-tight ${compact ? 'text-base' : 'text-lg sm:text-xl'}`}>
          Sync <span className="text-blue-600">Desk</span>
        </span>
      </div>

      <div className={`w-[1px] bg-slate-300 ${compact ? 'h-6' : 'h-8'}`}></div>

      {/* Saveetha Engineering College Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/sec.png"
          alt="Saveetha Engineering College"
          className={`${compact ? 'h-7' : 'h-9 sm:h-10'} w-auto object-contain`}
        />
        {!compact && (
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-extrabold text-blue-900 leading-tight tracking-wide">SAVEETHA</span>
            <span className="text-[9px] font-bold text-slate-600 leading-tight">ENGINEERING COLLEGE</span>
          </div>
        )}
      </div>

      <div className={`w-[1px] bg-slate-300 ${compact ? 'h-6' : 'h-8'}`}></div>

      {/* IDEA Lab Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/idea.png"
          alt="IDEA Lab"
          className={`${compact ? 'h-7' : 'h-9 sm:h-10'} w-auto object-contain`}
        />
        {!compact && (
          <span className="hidden sm:inline font-bold text-sm text-slate-800 tracking-tight">
            IDEA Lab
          </span>
        )}
      </div>
    </div>
  );
};
