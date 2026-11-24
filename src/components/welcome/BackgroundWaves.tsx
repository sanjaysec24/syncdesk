import React from 'react';

export const BackgroundWaves: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none -z-10 opacity-70">
      <div className="absolute bottom-0 left-0 w-96 h-32 bg-blue-200/40 rounded-tr-full blur-2xl"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-28 bg-purple-200/40 rounded-t-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-32 bg-pink-200/40 rounded-tl-full blur-2xl"></div>
    </div>
  );
};
