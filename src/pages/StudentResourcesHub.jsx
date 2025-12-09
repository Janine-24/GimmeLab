import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
 LayoutGrid, Users, Search, 
  ChevronDown, X, Clock, AlertCircle
} from 'lucide-react';
import ProfilePage from './ProfilePage'; // Import the new Profile Page

const initialResources = [
  {
    id: 1, title: "Robotics Lab Kit A", department: "FOE", type: "Kit",
    subtitle: "Advanced servo motors", details: "Includes Arduino Mega",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2, title: "3D Printer (Prusa MK3)", department: "FCI", type: "Equipment",
    subtitle: "High precision", details: "Filament provided",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3, title: "VR Headset (Quest 2)", department: "FCM", type: "Device",
    subtitle: "Standalone VR", details: "Unity ready",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 4, title: "Oscilloscope", department: "FOM", type: "Equipment",
    subtitle: "100MHz 2-Channel", details: "Digital Storage",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 5, title: "MacBook Pro M2", department: "FAC", type: "Device",
    subtitle: "Video Editing", details: "Final Cut Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 6, title: "Pocket3", department: "FCA", type: "Device",
    subtitle: "With Clear Image Shown", description: "Standalone VR headset.",
    image: "https://m.media-amazon.com/images/I/514LEUejXYL.jpg"
  
  }
];

const myHistoryData = [
  {
    id: 101, resourceName: "Robotics Lab Kit A", borrowTime: "2023-10-01", deadline: "2023-10-03",
    returnLocation: "Lab Block A", status: "Returned", isOverdue: false 
  },
  {
    id: 102, resourceName: "VR Headset", borrowTime: "2023-11-05", deadline: "2023-11-06",
    returnLocation: "Media Room", status: "Borrowed", isOverdue: true 
  },
  {
    id: 103, resourceName: "3D Printer", borrowTime: "2025-12-08", deadline: "2025-12-10",
    returnLocation: "Maker Space", status: "Borrowed", isOverdue: false 
  }
];


const StudentResourceHub = () => {
  const isDarkMode = false; // Always bright mode
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activePage, setActivePage] = useState('Overview'); // State for navigation
  const listRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredResources = useMemo(() => {
    return initialResources.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesFaculty = selectedFaculty === "All" || item.department === selectedFaculty;
      const matchesType = selectedType === "All" || item.type === selectedType;
      return matchesSearch && matchesFaculty && matchesType;
    });
  }, [debouncedQuery, selectedFaculty, selectedType]);

  const departments = ["All", ...new Set(initialResources.map(r => r.department))];
  const types = ["All", ...new Set(initialResources.map(r => r.type))];
  const activeLoansCount = myHistoryData.filter(r => r.status === 'Borrowed').length;

  // === 🎨 核心样式定义 (Bright) ===
  const theme = {
    // 容器背景
    container: "bg-[#F0F4F8] text-slate-600 selection:bg-cyan-200 selection:text-cyan-900",
    
    // 侧边栏玻璃效果
    sidebar: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/50",
    
    // 玻璃卡片
    card: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/40 hover:bg-white/60",
    
    // 文字颜色
    textMain: "text-slate-800",
    textSub: "text-slate-500",
    
    // 输入框
    input: "bg-white/40 border-white/50 text-slate-700 placeholder-slate-400 focus:bg-white/60 focus:ring-cyan-400/50 shadow-sm",
    
    // 强调色
    accent: "text-cyan-600",
  };

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden transition-colors duration-500 ${theme.container} relative`}>
      {/* ✨ 环境光 (只在 Bright Mode 显示，或者在 Dark Mode 变暗) */}
      <>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      </>

      {/* 历史记录弹窗 */}
      {showHistory && (
        <StudentHistoryPanel 
          history={myHistoryData} 
          onClose={() => setShowHistory(false)} 
          theme={theme}
          isDarkMode={isDarkMode}
        />
      )}

      {/* 侧边栏 */}
      <aside className={`w-20 md:w-64 flex flex-col p-6 border-r z-20 transition-all duration-300 ${theme.sidebar}`}>
        <div className="flex items-center gap-2 mb-10 px-2 justify-center md:justify-start">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/30`}>L</div>
            <h1 className={`hidden md:block text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500`}>
              Gimme<span className={'text-cyan-500'}>Lab</span>
            </h1>
        </div>
        
        <nav className="flex flex-col gap-2 w-full">
          <NavItem icon={<LayoutGrid size={20} />} label="Overview" active={activePage === 'Overview'} onClick={() => setActivePage('Overview')} />
          <NavItem icon={<Users size={20} />} label="Profile" active={activePage === 'Profile'} onClick={() => setActivePage('Profile')} />
        </nav>
      </aside>

      {/* 主内容 */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {activePage === 'Overview' && (
          <>
            {/* 顶部栏 */}
            <header className="flex justify-between items-center px-8 py-6">
              <div>
                <h2 className={`text-2xl font-bold ${theme.textMain}`}>Resource Hub</h2>
                <p className={`text-sm ${theme.textSub} mt-1`}>Browse and reserve lab equipment</p>
              </div>

              <div className="flex items-center gap-6">
                {/* 动态计数器 */}
                <div 
                  className={`flex items-center gap-3 cursor-pointer group px-4 py-2 rounded-xl transition-all bg-white/40 border border-white/50 hover:bg-white/60 shadow-sm`}
                  onClick={() => setShowHistory(true)}
                >
                  <div className="relative">
                    {/*photo*/}
                    <img src="https://tse3.mm.bing.net/th/id/OIP.-PXK7aBQCcSBqFnY2uGMHwHaHW?pid=Api&P=0&h=180" alt="Student" className="w-8 h-8 rounded-full border-2 border-white/50" />
                  </div>
                  <span className={`text-sm font-medium hidden md:block ${theme.textMain}`}>My Reservations</span>
                  </div>
              </div>
            </header>

            {/* 内容区域 */}
            <div className="px-8 pb-8 flex-1 overflow-hidden flex flex-col">
              <div className={`flex-1 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 bg-white/30 backdrop-blur-md border border-white/50 shadow-xl`}>
                {/* 搜索与筛选 */}
                <div className={`p-6 border-b border-white/40`}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className={`h-5 w-5 transition-colors text-slate-400 group-focus-within:text-cyan-500`} />
                      </div>
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search equipment..." 
                        className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all ${theme.input}`}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Dropdown label="Faculty" options={departments} value={selectedFaculty} onChange={setSelectedFaculty} theme={theme} isDarkMode={isDarkMode} />
                      <Dropdown label="Type" options={types} value={selectedType} onChange={setSelectedType} theme={theme} isDarkMode={isDarkMode} />
                    </div>
                  </div>
                </div>

                {/* 列表区域 */}
                <div className="flex-1 overflow-y-auto p-6 relative custom-scrollbar" ref={listRef}>
                  <div className="grid grid-cols-1 gap-4">
                    {filteredResources.map((item) => (
                      <div 
                          key={item.id} 
                          onClick={() => setExpandedCardId(expandedCardId === item.id ? null : item.id)}
                          className={`group flex flex-col p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${theme.card} ${expandedCardId === item.id ? 'ring-2 ring-cyan-400/30' : ''}`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-32 h-20 overflow-hidden rounded-xl flex-shrink-0 ${isDarkMode ? 'border-slate-600' : 'border-white/60 shadow-inner'}`}>
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> {/* isDarkMode removed */}
                          </div>

                          <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-1 ${theme.textMain}`}>{item.title}</h3>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-md font-medium bg-white/60 text-slate-600 border border-white/40`}>
                                  {item.department}
                                </span>
                                <span className={`text-xs ${theme.textSub}`}>{item.type}</span>
                            </div>
                          </div>
                          
                          <ChevronDown size={20} className={`${theme.textSub} transition-transform ${expandedCardId === item.id ? 'rotate-180' : ''}`} />
                        </div>
                        {/* isDarkMode removed */}
                        <div className={`grid transition-all duration-300 ease-in-out ${expandedCardId === item.id ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t ' + (isDarkMode ? 'border-slate-700' : 'border-white/30') : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                  <p className={`text-sm mb-4 ${theme.textSub}`}>{item.subtitle} - {item.details}</p>
                                  <button className={`w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg ${isDarkMode ? 'bg-teal-600 hover:bg-teal-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-cyan-500/40 hover:scale-[1.02]'}`}>
                                    Reserve Resource
                                  </button>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {activePage === 'Profile' && <ProfilePage />}
      </main>
    </div>
  );
};

// --- 子组件 (Dropdown, Modal, NavItem) ---

const StudentHistoryPanel = ({ history, onClose, theme, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200"> {/* isDarkMode removed */}
      <div className={`w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden bg-[#F0F4F8]/90 backdrop-blur-xl border border-white/60`}>
        <div className={`flex justify-between items-center p-6 border-b border-white/40`}>
          <h2 className={`text-2xl font-bold ${theme.textMain}`}>History</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full"><X size={24} className={theme.textSub}/></button> {/* isDarkMode removed */}
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-sm uppercase tracking-wider ${theme.textSub} border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                <th className="pb-4 font-semibold pl-4">Resource</th>
                <th className="pb-4 font-semibold">Time</th>
                <th className="pb-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {history.map((record) => {
                const isOverdue = record.isOverdue;
                const isReturned = record.status === "Returned"; // isDarkMode removed
                let rowClass = `border-b transition-colors border-slate-200 `;
                let badgeClass = "";

                if (isOverdue) {
                   rowClass += "bg-red-50";
                   badgeClass = "bg-red-100 text-red-600 border border-red-200";
                } else if (isReturned) {
                   rowClass += "bg-green-50";
                   badgeClass = "bg-green-100 text-green-600 border border-green-200";
                } else {
                   badgeClass = "bg-cyan-100 text-cyan-600 border border-cyan-200";
                }

                return (
                  <tr key={record.id} className={rowClass}>
                    <td className={`py-4 px-4 font-medium ${theme.textMain}`}>{record.resourceName}</td>
                    <td className={`py-4 ${theme.textSub}`}>
                         <div className="flex items-center gap-2"><Clock size={12}/> {record.borrowTime}</div>
                         <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-500 font-bold' : ''}`}><AlertCircle size={12}/> Due: {record.deadline}</div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeClass}`}>
                        {isOverdue ? "Overdue" : record.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({ label, options, value, onChange, theme, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative min-w-[120px]">
      <div onClick={() => setIsOpen(!isOpen)} className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all ${theme.input}`}>
        <span className="text-sm font-medium">{value === 'All' ? label : value}</span>
        <ChevronDown size={16} />
      </div>
      {isOpen && ( // isDarkMode removed
        <div className={`absolute top-full left-0 w-full mt-2 rounded-xl border shadow-xl z-50 overflow-hidden bg-white/90 backdrop-blur-xl border-white/60`}>
          {options.map(opt => (
            <div key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} className={`p-3 text-sm cursor-pointer hover:bg-black/5 ${value === opt ? 'text-cyan-600 font-bold' : theme.textSub}`}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => ( // isDarkMode removed from props
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${active ? 'bg-white shadow-lg shadow-cyan-500/10 text-cyan-600' : 'text-slate-500 hover:bg-white/50'}`}>
    {icon}
    <span className={`font-medium hidden md:block`}>{label}</span>
  </div>
);

export default StudentResourceHub;