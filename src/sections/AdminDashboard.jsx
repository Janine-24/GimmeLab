import React from 'react';
import { Server, Users, Activity, ShieldAlert,Zap } from 'lucide-react';

import useUsageOptimizer from '../hooks/useUsageOptimizer'; 
import PeakHoursChart from '../components/dashboard/PeakHoursChart'; 
import UsageRankingChart from '../components/dashboard/UsageRankingChart';
import MaintenanceAlert from '../components/dashboard/MaintenanceAlert';
import AlternativeSuggestions from "../components/dashboard/AlternativeSuggestions";


const AdminDashboard = () => {

  const { resources, maintenanceList, stats, getAlternativesFor, loading } = useUsageOptimizer();

  const MetricBadge = ({ icon: Icon, value, label }) => (
  <div className="px-5 py-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl flex flex-col items-center min-w-[100px]">
    <span className="block text-2xl font-black">{value}</span>
    <div className="flex items-center gap-1 opacity-70">
      <Icon size={12} />
      <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
    </div>
  </div>
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      
      {/* Command Center Banner */}
      <div className="md:col-span-3 bg-gradient-to-br from-fuchsia-600 to-purple-700 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-fuchsia-100 text-sm font-mono tracking-widest uppercase">System Operational</p>
            </div>
            <h2 className="text-4xl font-black tracking-tight">Command Center</h2>
          </div>

          {/* Dynamic Quick Metrics from Hook */}
          <div className="flex flex-wrap gap-4">
            <MetricBadge icon={Server} value={stats.activeCount || 0} label="Active Labs" />
            <MetricBadge icon={Activity} value={stats.totalUsage || 0} label="Total Uses" />
            <MetricBadge icon={Users} value="45" label="Users Online" />
          </div>
        </div>
      </div>

      {/* --- 2. Analytics Charts Section --- */}
      <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Peak Hours (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50"></div>
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
               <span className="w-2 h-6 bg-cyan-400 rounded-full"></span>
               Peak Usage Hours
             </h3>
             <button className="text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-lg hover:bg-cyan-100 transition">
               View Report
             </button>
           </div>
           {/* Chart Container */}
           <div className="h-64 w-full flex items-center justify-center">
             {loading ? (
                <p className="text-slate-500 text-sm">Loading chart...</p>
             ) : (
                <PeakHoursChart />
             )}
           </div>
        </div>

        {/* Usage Ranking (Takes 1 column) */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 to-purple-500 opacity-50"></div>
           <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
             <span className="w-2 h-6 bg-fuchsia-400 rounded-full"></span>
             Top Equipment
           </h3>
           {/* Chart Container */}
           <div className="h-64 w-full flex items-center justify-center">
             {loading ? (
                <p className="text-slate-500 text-sm">Loading chart...</p>
             ) : (
                <UsageRankingChart resources={resources} />
             )}
           </div>
        </div>
      </div>

      {/* --- 3. Operational Widgets Section --- */}
      <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Existing: Pending Approvals (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-lg flex flex-col">
           <div className="flex items-center gap-3 text-amber-500 mb-2">
             <ShieldAlert size={20} />
             <h3 className="font-bold">Pending Approvals</h3>
           </div>
           <p className="text-4xl font-black text-slate-700">3</p>
           <p className="text-xs text-slate-500 mt-1">Requests require attention</p>
           <button className="mt-4 w-full py-2 bg-amber-50 text-amber-600 font-bold text-xs rounded-xl hover:bg-amber-100 transition">
             Review All
           </button>
        </div>

        {/* New: Maintenance & Optimization (Spans 1 column) */}
        <div className="flex flex-col space-y-4">
           {/* Auto-Triggered Maintenance Alert */}
           <MaintenanceAlert items={maintenanceList} />
           
           {/* Smart Optimization Suggestions */}
           {maintenanceList.length > 0 ? (
             <AlternativeSuggestions 
               maintenanceItems={maintenanceList} 
               getAlternatives={getAlternativesFor} 
             />
           ) : (
             // Fallback empty state if everything is healthy
             <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-700 h-full">
               <div className="p-2 bg-emerald-100 rounded-full"><Zap size={16} /></div>
               <p className="text-sm font-medium">System Optimal: No maintenance required at this time.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

// Tiny Internal Helper Component


export default AdminDashboard;