import React from 'react';
import { Shield, GraduationCap, Briefcase } from 'lucide-react';

const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'admin', label: 'Admin', icon: Shield },
];
// Define the component
const RoleSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex p-1 mb-6 bg-slate-100/80 rounded-xl border border-slate-200">
      {roles.map((role) => {
        const isActive = selected === role.id;
        const RoleIcon = role.icon;
        return (
          <button
            key={role.id}
            type="button"
            // FIX: Ensure we call the prop name exactly as defined above
            onClick={() => onSelect(role.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all duration-300
              ${isActive 
                ? 'bg-white text-cyan-600 shadow-md scale-105 ring-1 ring-cyan-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              }`}
          >
            <RoleIcon size={16} />
            {role.label}
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
