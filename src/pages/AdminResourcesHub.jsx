import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
 LayoutGrid, Users, Search, 
  ChevronDown, X, CheckCircle, Bell
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

const initialBorrowRecords = [
  { id: 101, studentName: "Alice Guo", email: "alice@uni.edu", resource: "Robotics Kit", borrowTime: "2023-10-25", expectedReturn: "2023-10-27", status: "Returned", overdue: false },
  { id: 102, studentName: "Bob Chen", email: "bob@uni.edu", resource: "VR Headset", borrowTime: "2023-12-01", expectedReturn: "2023-12-02", status: "Not Returned", overdue: true },
  { id: 103, studentName: "Charlie Dan", email: "charlie@uni.edu", resource: "3D Printer", borrowTime: "2025-12-09", expectedReturn: "2025-12-10", status: "Not Returned", overdue: false }
];

const AdminResourceHub = () => {
  const [resources] = useState(initialResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activePage, setActivePage] = useState('Overview'); // State for navigation
  const listRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredResources = useMemo(() => {
    return resources.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesFaculty = selectedFaculty === "All" || item.department === selectedFaculty;
      const matchesType = selectedType === "All" || item.type === selectedType;
      return matchesSearch && matchesFaculty && matchesType;
    });
  }, [debouncedQuery, selectedFaculty, selectedType, resources]);

  const departments = ["All", ...new Set(resources.map(r => r.department))];
  const types = ["All", ...new Set(resources.map(r => r.type))];

  // Bright Theme Config
  const theme = {
  container: "bg-[#F0F4F8] text-slate-600",
  sidebar: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl",
  cardBg: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/40 hover:bg-white/60",
  textMain: "text-slate-800",
  textSub: "text-slate-500",
  inputBg: "bg-white/40 border-white/50 text-slate-700 shadow-sm focus:bg-white/60 focus:ring-cyan-400/50",
};

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden transition-colors duration-500 ${theme.container} relative`}>
<>
   <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" />
   <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
</>

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <AdminBorrowingPanel 
          records={initialBorrowRecords} 
          onClose={() => setShowAdminPanel(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`w-20 md:w-64 flex flex-col p-6 border-r z-20 ${theme.sidebar}`}>
        <div className="flex items-center gap-2 mb-10 justify-center md:justify-start">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/30`}>A</div>
            <h1 className={`hidden md:block text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500`}>
              GimmeLab<span className={'text-cyan-500'}>Admin</span>
            </h1>
        </div>
        <nav className="flex flex-col gap-2 w-full">
          <NavItem icon={<LayoutGrid size={20} />} label="Overview" active={activePage === 'Overview'} onClick={() => setActivePage('Overview')} />
          <NavItem icon={<Users size={20} />} label="Profile" active={activePage === 'Profile'} onClick={() => setActivePage('Profile')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {activePage === 'Overview' && (
          <>
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6">
              <div>
                <h2 className={`text-2xl font-bold ${theme.textMain}`}>Resource Hub</h2>
                <p className={`text-sm ${theme.textSub} mt-1`}>Manage resources and loan requests</p>
              </div>

              <div className="flex items-center gap-6">
                <div 
                  className={`flex items-center gap-3 cursor-pointer group px-4 py-2 rounded-xl transition-all bg-white/40 border border-white/50 hover:bg-white/60 shadow-sm`}
                  onClick={() => setShowAdminPanel(true)}
                >
                  <div className="relative">
                    <Bell size={20} className={theme.textSub} />
                  </div>
                  <span className={`text-sm font-medium hidden md:block ${theme.textMain}`}>Notification</span>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="px-8 pb-8 flex-1 overflow-hidden flex flex-col">
              <div className={`flex-1 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 bg-white/30 backdrop-blur-md border border-white/50 shadow-xl`}>
                
                {/* Search */}
                <div className={`p-6 border-b border-white/40`}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search inventory..." 
                        className={`w-full pl-5 pr-4 py-3 rounded-xl outline-none transition-all ${theme.inputBg}`}
                      />
                      <Search className={`absolute right-4 top-3 h-5 w-5 text-slate-400`} />
                    </div>
                    <div className="flex gap-3">
                      <Dropdown label="Faculty" options={departments} value={selectedFaculty} onChange={setSelectedFaculty} theme={theme} />
                      <Dropdown label="Type" options={types} value={selectedType} onChange={setSelectedType} theme={theme} />
                    </div>
                  </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar" ref={listRef}>
                  <div className="grid grid-cols-1 gap-4">
                    {filteredResources.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setExpandedCardId(expandedCardId === item.id ? null : item.id)}
                        className={`group p-4 rounded-2xl cursor-pointer transition-all border ${theme.cardBg} ${expandedCardId === item.id ? 'ring-2 ring-cyan-400/30' : ''}`}
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold ${theme.textMain}`}>{item.title}</h3>
                            <div className="flex gap-2 text-xs opacity-70">
                                <span>{item.department}</span> • <span>{item.type}</span>
                            </div>
                          </div>
                          <ChevronDown size={20} className={`${theme.textSub} transition-transform ${expandedCardId === item.id ? 'rotate-180' : ''}`} />
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 ${expandedCardId === item.id ? 'max-h-40 mt-4 pt-4 border-t border-white/30' : 'max-h-0'}`}>
                            <div className="flex justify-between items-center">
                              <p className={`text-sm ${theme.textSub}`}>{item.description}</p>
                              <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs hover:bg-black transition-colors">Edit Item</button>
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

// Admin Panel Modal (With Checkbox Logic)
const AdminBorrowingPanel = ({ records: initialRecords, onClose }) => {
  const [records, setRecords] = useState(initialRecords);

  const handleReturn = (id) => {
    setRecords(records.map(record => {
      if (record.id === id) {
        return { ...record, status: "Returned", overdue: false }; 
      }
      return record;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
      <div className={`w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden bg-[#F0F4F8]/95 backdrop-blur-xl border border-white/60`}>
        <div className={`p-6 border-b flex justify-between items-center border-white/40`}>
          <h2 className={`text-2xl font-bold text-slate-800`}>Loan Management</h2>
          <button onClick={onClose}><X size={24} className="opacity-50 hover:opacity-100"/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-left">
            <thead>
              <tr className={`text-sm uppercase tracking-wider opacity-60 border-b border-slate-200`}>
                <th className="pb-4 pl-4">Student</th>
                <th className="pb-4">Gmail</th>
                <th className="pb-4">Item</th>
                <th className="pb-4 text-center">Status</th>
                <th className="pb-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {records.map(record => {
                const isReturned = record.status === "Returned";
                const isOverdue = record.overdue && !isReturned;
                let rowClass = `border-b border-slate-200 `;
                
                if (isReturned) rowClass += "bg-green-50";
                else if (isOverdue) rowClass += "bg-red-50";
                
                return (
                  <tr key={record.id} className={rowClass}>
                    <td className="py-4 px-4 font-medium opacity-80">{record.studentName}</td>
                    <td className="py-4 opacity-70">{record.email}</td>
                    <td className="py-4 opacity-70">{record.resource}</td>
                    <td className="py-4 text-center">
                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${isOverdue ? 'bg-red-100 text-red-600' : isReturned ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                         {isOverdue ? "OVERDUE" : record.status}
                       </span>
                    </td>
                    <td className="py-4 text-center">
                      {isReturned ? (
                        <CheckCircle size={20} className="mx-auto text-green-500 opacity-50" />
                      ) : (
                        <button onClick={() => handleReturn(record.id)} className="mx-auto w-6 h-6 border-2 border-slate-400 rounded hover:bg-green-500 hover:border-green-500 hover:text-white transition-all flex items-center justify-center group">
                           <span className="opacity-0 group-hover:opacity-100 text-xs">✓</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const NavItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${active ? 'bg-white shadow-lg shadow-cyan-500/10 text-cyan-600' : 'hover:bg-white/50 opacity-70 hover:opacity-100'}`}>
    {icon}
    <span className="font-medium hidden md:block">{label}</span>
  </div>
);

const Dropdown = ({ label, options, value, onChange, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative min-w-[120px]">
      <div onClick={() => setIsOpen(!isOpen)} className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all ${theme.inputBg}`}>
        <span className="text-sm font-medium">{value === 'All' ? label : value}</span>
        <ChevronDown size={16} />
      </div>
      {isOpen && (
        <div className={`absolute top-full left-0 w-full mt-2 rounded-xl border shadow-xl z-50 overflow-hidden bg-white/90 backdrop-blur-xl border-white/60`}>
          {options.map(opt => (
            <div key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} className={`p-3 text-sm cursor-pointer hover:bg-black/5 ${value === opt ? 'font-bold text-cyan-600' : ''}`}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminResourceHub;