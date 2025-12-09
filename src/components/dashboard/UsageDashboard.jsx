import React from 'react';
import { Activity, BarChart2, Layers, Zap } from 'lucide-react';
import { useUsageOptimizer } from '../../hooks/useUsageOptimizer';
import MetricCard from './MetricCard';
import PeakHoursChart from './PeakHoursChart';
import UsageRankingChart from './UsageRankingChart';
import MaintenanceAlert from './MaintenanceAlert';
import AlternativeSuggestions from './AlternativeSuggestions';

const UsageDashboard = () => {
  const { resources, maintenanceList, stats, getAlternativesFor } = useUsageOptimizer();

  return (
    <div className="min-h-screen bg-slate-50 bg-grid-pattern p-6 md:p-10 font-sans text-slate-800">
      
      {/* --- Header --- */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-holo-400 to-holo-purple mb-2">
            Usage Tracking Hub
          </h1>
          <p className="text-slate-500 font-medium">Real-time optimization & resource allocation</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-white border border-holo-200 text-holo-500 font-bold rounded-xl shadow-sm hover:shadow-neon-cyan transition">
            Export Report
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-holo-400 to-holo-500 text-white font-bold rounded-xl shadow-lg shadow-holo-400/40 hover:shadow-neon-cyan transition flex items-center gap-2">
            <Zap size={18} /> Optimize All
          </button>
        </div>
      </header>

      {/* --- Top Metrics Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Total Resource Uses" 
          value={stats.totalUsage} 
          icon={Activity} 
          trend="12%"
          colorClass="border-holo-300"
        />
        <MetricCard 
          title="Active Inventory" 
          value={stats.activeCount} 
          icon={Layers} 
          colorClass="border-purple-300"
        />
        <MetricCard 
          title="System Load" 
          value="45%" 
          icon={BarChart2} 
          colorClass="border-holo-lime"
        />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Charts (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Peak Hours Section */}
          <section className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
             {/* Neon Glow Effect on border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-holo-400 to-transparent opacity-50"></div>
            
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-holo-400 rounded-full"></span>
              Peak Usage Hours
            </h2>
            <div className="h-64 w-full">
              <PeakHoursChart />
            </div>
          </section>

          {/* Ranking Section */}
          <section className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-holo-pink rounded-full"></span>
              Most Popular Equipment
            </h2>
            <div className="h-48 w-full">
              <UsageRankingChart resources={resources} />
            </div>
          </section>
        </div>

        {/* Right Column: Actions & Alerts (Span 1) */}
        <div className="lg:col-span-1">
          
          {/* Maintenance Widget */}
          <MaintenanceAlert items={maintenanceList} />

          {/* Suggestions Widget */}
          <AlternativeSuggestions 
            maintenanceItems={maintenanceList} 
            getAlternatives={getAlternativesFor} 
          />

          {/* Decorative Info Panel */}
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-holo-400 to-holo-purple text-white shadow-lg shadow-holo-400/30">
            <h3 className="font-bold text-lg mb-2">Did you know?</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Shifting VR Lab usage to 10:00 AM could reduce equipment wear by 15% based on current temperature data.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UsageDashboard;