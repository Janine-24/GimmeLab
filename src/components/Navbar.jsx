// components/Navbar.jsx
import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Now accepts 'tabs' as a prop
export default function Navbar({ user, activeTab, onTabChange, tabs }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between mb-8 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/50 shadow-sm transition-all">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-fuchsia-600 cursor-default select-none">
          GimmeLab
        </h1>
        
        {/* Dynamic Tabs Rendering */}
        <nav className="hidden md:flex gap-1 bg-slate-100/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-200 
                ${activeTab === tab.id 
                  ? 'bg-white shadow text-cyan-600 scale-105' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-bold text-slate-700">{user?.name || 'Guest'}</p>
          <p className="text-[10px] text-cyan-600 font-black uppercase tracking-widest">
            {user?.role || 'Visitor'}
          </p>
        </div>
        <button onClick={() => navigate('/')} className="p-2 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-lg transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}