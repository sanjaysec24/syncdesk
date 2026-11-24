import React from 'react';

interface InstitutionalLogosProps {
  compact?: boolean;
}

export const InstitutionalLogos: React.FC<InstitutionalLogosProps> = ({ compact = false }) => {
  return (
    <div className={`flex items-center ${compact ? 'gap-3 sm:gap-4' : 'gap-4 sm:gap-6'}`}>
      {/* Sync Desk Logo Image Only */}
      <img
        src="/mainlogo.png"
        alt="Sync Desk"
        className={`${compact ? 'h-8 sm:h-9' : 'h-10 sm:h-12'} w-auto object-contain max-w-[150px] sm:max-w-[180px]`}
      />

      <div className={`w-[1px] bg-slate-300 ${compact ? 'h-6' : 'h-8'}`}></div>

      {/* Saveetha Engineering College Logo Image Only */}
      <img
        src="/sec.png"
        alt="Saveetha Engineering College"
        className={`${compact ? 'h-7 sm:h-8' : 'h-9 sm:h-11'} w-auto object-contain max-w-[120px] sm:max-w-[150px]`}
      />

      <div className={`w-[1px] bg-slate-300 ${compact ? 'h-6' : 'h-8'}`}></div>

      {/* IDEA Lab Logo Image Only */}
      <img
        src="/idea.png"
        alt="IDEA Lab"
        className={`${compact ? 'h-7 sm:h-8' : 'h-9 sm:h-11'} w-auto object-contain max-w-[100px] sm:max-w-[130px]`}
      />
    </div>
  );
};
