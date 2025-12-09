import React from 'react';
import { 
  Home, Activity, PieChart, Settings, Search, 
  Bell, User, TrendingUp, MoreHorizontal, Zap 
} from 'lucide-react';

const BrightDashboard = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#F0F4F8] text-slate-600 font-sans overflow-hidden selection:bg-cyan-200 selection:text-cyan-900">
      
      {/* --- 1. Ambient Background Blobs (环境光晕) --- */}
      {/* 这是一个关键步骤：在背景层放置模糊的彩色光球，创造全息感 */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-fuchsia-300/30 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />

      <div className="flex h-screen relative z-10 p-6 gap-6">
        
        {/* --- 2. Glass Sidebar (全息侧边栏) --- */}
        <aside className="w-64 h-full flex flex-col justify-between p-6 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-xl shadow-slate-200/50 transition-all hover:border-white/80">
          <div>
            {/* Logo with Gradient Text */}
            <div className="flex items-center gap-2 mb-10 px-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white font-bold">L</div>
              <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">
                LUMOS<span className="text-cyan-500">.</span>UI
              </h1>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-2">
              <NavItem icon={<Home size={20} />} label="Dashboard" active />
              <NavItem icon={<Activity size={20} />} label="Live Stream" />
              <NavItem icon={<PieChart size={20} />} label="Analytics" />
              <NavItem icon={<Zap size={20} />} label="Integrations" />
            </nav>
          </div>

          <div className="mt-auto">
             <NavItem icon={<Settings size={20} />} label="Settings" />
             {/* Admin Profile Card */}
             <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-white/60 backdrop-blur-md shadow-sm">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-400 to-purple-500 p-[2px]">
                   <div className="w-full h-full rounded-full bg-white/90" /> 
                   {/* 模拟头像边框 */}
                   <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80" className="w-full h-full rounded-full object-cover border-2 border-white" alt="User"/>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Dr. Sarah</p>
                  <p className="text-xs text-slate-500">Lead Admin</p>
                </div>
             </div>
          </div>
        </aside>

        {/* --- 3. Main Content Area --- */}
        <main className="flex-1 flex flex-col gap-6 overflow-hidden">
          
          {/* Header */}
          <header className="flex justify-between items-center py-2">
             <div>
               <h2 className="text-3xl font-bold text-slate-800">System Overview</h2>
               <p className="text-slate-500 text-sm mt-1">Bright Mode / Holographic View v2.0</p>
             </div>

             <div className="flex items-center gap-4">
                {/* Holographic Search Bar */}
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Search data..." 
                     className="pl-10 pr-4 py-3 w-64 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:bg-white/60 transition-all shadow-sm"
                   />
                </div>
                
                <button className="p-3 rounded-xl bg-white/40 border border-white/50 hover:bg-white/70 transition-colors shadow-sm relative">
                  <Bell size={20} className="text-slate-600" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.6)] animate-pulse"></span>
                </button>
             </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
             <GlassCard className="border-b-4 border-b-cyan-400 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-cyan-100/50 rounded-lg text-cyan-600 group-hover:scale-110 transition-transform">
                    <User size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-600 border border-green-200">+12%</span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Users</h3>
                <p className="text-4xl font-black text-slate-800 mt-1 drop-shadow-sm">24,593</p>
             </GlassCard>

             <GlassCard className="border-b-4 border-b-fuchsia-400 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-fuchsia-100/50 rounded-lg text-fuchsia-600 group-hover:scale-110 transition-transform">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-600 border border-green-200">+5.4%</span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Revenue</h3>
                <p className="text-4xl font-black text-slate-800 mt-1 drop-shadow-sm">$84,302</p>
             </GlassCard>

             <GlassCard className="border-b-4 border-b-violet-500 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-violet-100/50 rounded-lg text-violet-600 group-hover:scale-110 transition-transform">
                    <Activity size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-600 border border-amber-200">Load</span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">System Health</h3>
                <p className="text-4xl font-black text-slate-800 mt-1 drop-shadow-sm">98.2%</p>
                {/* Custom Progress Bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 w-[98%] shadow-[0_0_10px_rgba(167,139,250,0.5)]"></div>
                </div>
             </GlassCard>
          </div>

          {/* Main Chart Section */}
          <div className="flex gap-6 flex-1 min-h-0">
             {/* Big Chart Area */}
             <GlassCard className="flex-[2] flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 z-10 relative">
                   <h3 className="text-xl font-bold text-slate-800">Traffic Analysis</h3>
                   <div className="flex gap-2">
                      {['1H', '1D', '1W', '1M'].map(t => (
                        <button key={t} className="px-3 py-1 text-xs font-bold rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-500 hover:text-cyan-600">{t}</button>
                      ))}
                   </div>
                </div>
                
                {/* CSS-Only Decorative Graph (Simulating a chart) */}
                <div className="flex-1 relative w-full h-full flex items-end justify-between gap-2 px-4 pb-4">
                   {/* Grid Lines */}
                   <div className="absolute inset-0 border-t border-slate-200/50 top-10"></div>
                   <div className="absolute inset-0 border-t border-slate-200/50 top-1/2"></div>
                   <div className="absolute inset-0 border-t border-slate-200/50 bottom-10"></div>
                   
                   {/* Simulated Data Bars */}
                   {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                      <div key={i} className="w-full bg-gradient-to-t from-cyan-400/20 to-cyan-400/80 rounded-t-lg transition-all hover:to-fuchsia-400/80 hover:shadow-[0_0_15px_rgba(232,121,249,0.5)] cursor-pointer" style={{ height: `${h}%` }}></div>
                   ))}
                </div>
             </GlassCard>

             {/* Side List */}
             <GlassCard className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-lg font-bold text-slate-800">Active Nodes</h3>
                   <MoreHorizontal size={20} className="text-slate-400 cursor-pointer hover:text-slate-600"/>
                </div>
                
                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                   <NodeItem name="Alpha Server" status="Online" color="bg-green-400" />
                   <NodeItem name="Beta Database" status="Syncing" color="bg-cyan-400" animate />
                   <NodeItem name="Gamma Gateway" status="Warning" color="bg-amber-400" />
                   <NodeItem name="Delta Proxy" status="Online" color="bg-green-400" />
                   <NodeItem name="Epsilon Core" status="Offline" color="bg-red-400" />
                </div>
             </GlassCard>
          </div>

        </main>
      </div>
    </div>
  );
};

// --- Reusable Components (Styles encapsulated here) ---

// 1. 全息玻璃卡片容器
const GlassCard = ({ children, className = "" }) => (
  <div className={`p-6 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/40 transition-all hover:bg-white/50 ${className}`}>
    {children}
  </div>
);

// 2. 侧边栏导航项
const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${active ? 'bg-white shadow-lg shadow-cyan-500/10' : 'hover:bg-white/50'}`}>
    <div className={`transition-colors ${active ? 'text-cyan-600' : 'text-slate-400 group-hover:text-cyan-500'}`}>
      {icon}
    </div>
    <span className={`font-medium ${active ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>}
  </div>
);

// 3. 列表项
const NodeItem = ({ name, status, color, animate }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/30 border border-white/50 hover:bg-white/60 transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
       <div className={`w-2 h-2 rounded-full ${color} ${animate ? 'animate-ping' : ''} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}></div>
       <span className="text-sm font-semibold text-slate-700 group-hover:text-cyan-700 transition-colors">{name}</span>
    </div>
    <span className="text-xs text-slate-400 font-medium">{status}</span>
  </div>
);

export default BrightDashboard;