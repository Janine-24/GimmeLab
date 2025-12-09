import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

const StudentDashboard = ({ onBookClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      
      {/* Hero Card */}
      <div className="md:col-span-2 bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight">Student Portal</h2>
          <p className="text-cyan-100 mt-2 font-medium">Access your labs and upcoming assignments.</p>
          
          <button 
            onClick={onBookClick} 
            className="mt-8 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-sm font-bold hover:bg-white/30 hover:scale-105 transition-all shadow-lg"
          >
            Book Equipment
          </button>
        </div>
      </div>

      {/* Quick Stats / Side Panel */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-lg flex flex-col justify-center">
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Your Activity</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">12h</p>
              <p className="text-xs text-slate-500">Lab time this week</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-fuchsia-100 text-fuchsia-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">Top 10%</p>
              <p className="text-xs text-slate-500">Performance</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;