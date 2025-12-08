import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, ArrowRight, Loader2, Shield, GraduationCap, Briefcase } from 'lucide-react';



// Define the component
const NeonInput = ({ label, type, name, value, onChange, icon: Icon, error }) => (
  <div className="mb-4 group">
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
        <Icon size={18} />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 py-3 bg-white/50 border-2 rounded-xl outline-none transition-all duration-300
          ${error 
            ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_15px_rgba(248,113,113,0.3)]' 
            : 'border-slate-200 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.4)]'
          }
          text-slate-700 placeholder-slate-400 font-medium backdrop-blur-sm`}
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1 ml-1 font-medium animate-pulse">{error}</p>}
  </div>
);



// Export the component
export default NeonInput;
