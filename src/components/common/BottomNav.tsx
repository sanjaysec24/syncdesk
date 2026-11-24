import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layers, Users, MessageSquare, Menu, Home } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bottomNavItems = [
    { label: 'Home', path: '/workspace', icon: Home },
    { label: 'Members', path: '/members', icon: Users },
    { label: 'Groups', path: '/groups', icon: Layers },
    { label: 'Chat', path: '/chat', icon: MessageSquare },
    { label: 'More', path: '/settings', icon: Menu },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 shadow-lg flex items-center justify-around">
      {bottomNavItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
