import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RoleCard } from './RoleCard';

interface RoleSelectionProps {
  compact?: boolean;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ compact = false }) => {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'admin' | 'student' | 'faculty') => {
    switchRole(role);
    navigate(`/login`);
  };

  return (
    <div className="space-y-4">
      <h2 className={`font-extrabold text-slate-900 tracking-tight ${compact ? 'text-sm' : 'text-lg sm:text-xl'}`}>
        Choose how you're joining
      </h2>

      <div className={`grid ${compact ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-5'}`}>
        <RoleCard
          role="admin"
          title="Admin"
          description="Create and manage desks, teams and timetables."
          onClick={() => handleRoleSelect('admin')}
          compact={compact}
        />
        <RoleCard
          role="student"
          title="Student"
          description="Join a desk and submit your timetable."
          onClick={() => handleRoleSelect('student')}
          compact={compact}
        />
        <RoleCard
          role="faculty"
          title="Faculty"
          description="Join a desk and submit your timetable."
          onClick={() => handleRoleSelect('faculty')}
          compact={compact}
        />
      </div>
    </div>
  );
};
