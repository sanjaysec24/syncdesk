import React from 'react';
import { GraduationCap, Users, User, ArrowRight } from 'lucide-react';

interface RoleCardProps {
  role: 'admin' | 'student' | 'faculty';
  title: string;
  description: string;
  onClick: () => void;
  compact?: boolean;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, title, description, onClick, compact = false }) => {
  const getCardTheme = () => {
    switch (role) {
      case 'admin':
        return {
          bg: 'bg-[#F0F5FF]',
          border: 'border-blue-100/80',
          hoverBorder: 'hover:border-blue-300',
          iconBg: 'text-blue-600',
          arrowBg: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
          Icon: GraduationCap
        };
      case 'student':
        return {
          bg: 'bg-[#F5EEFF]',
          border: 'border-purple-100/80',
          hoverBorder: 'hover:border-purple-300',
          iconBg: 'text-purple-600',
          arrowBg: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
          Icon: Users
        };
      case 'faculty':
        return {
          bg: 'bg-[#FFF6ED]',
          border: 'border-amber-100/80',
          hoverBorder: 'hover:border-amber-300',
          iconBg: 'text-amber-600',
          arrowBg: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
          Icon: User
        };
    }
  };

  const theme = getCardTheme();
  const IconComponent = theme.Icon;

  return (
    <div
      onClick={onClick}
      className={`group relative ${theme.bg} border ${theme.border} ${theme.hoverBorder} rounded-3xl ${
        compact ? 'p-4' : 'p-6 sm:p-7'
      } transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
    >
      <div className="space-y-4">
        {/* Icon & Arrow */}
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center ${theme.iconBg}`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${theme.arrowBg} group-hover:translate-x-1 shadow-xs`}>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className={`font-extrabold text-slate-900 tracking-tight ${compact ? 'text-base' : 'text-xl'}`}>
            {title}
          </h3>
          <p className={`text-slate-600 font-medium leading-relaxed mt-1.5 ${compact ? 'text-xs' : 'text-xs sm:text-sm'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
