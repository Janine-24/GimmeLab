import React from 'react';

const MetricCard = ({ title, value, icon: Icon, trend, colorClass = "border-holo-300" }) => {
  return (
    <div className={`relative overflow-hidden bg-white/60 backdrop-blur-xl border ${colorClass} rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-cyan`}>
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-transparent to-holo-200 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
        </div>
        <div className="p-3 bg-white/50 rounded-xl shadow-sm text-holo-500">
          <Icon size={24} />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm font-medium text-emerald-500">
          <span>▲ {trend}</span>
          <span className="text-slate-400 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;