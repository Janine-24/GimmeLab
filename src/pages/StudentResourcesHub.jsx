import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LayoutGrid, Users, Search, ChevronDown, X, Clock, AlertCircle } from 'lucide-react';
import ProfilePage from './ProfilePage'; 
import { useApp } from '../context/AppContext'; 
import BookingModal from '../components/BookingModal'; // 🟢 Import the new component

const StudentResourceHub = () => {
  const { resources, user, reservations, addReservation } = useApp(); // 🟢 Get Data & Actions

  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activePage, setActivePage] = useState('Overview');
  
  // Booking State
  const [bookingItem, setBookingItem] = useState(null); // Which item is being booked?

  // Search Logic
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

  // 🟢 Filter Reservations for CURRENT User only
  const myReservations = reservations.filter(r => r.userId === user?.email);

  // Common Styles
  const theme = {
    container: "bg-[#F0F4F8] text-slate-600",
    sidebar: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl",
    card: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white/60",
    textMain: "text-slate-800",
    textSub: "text-slate-500",
    input: "bg-white/40 border-white/50 text-slate-700 placeholder-slate-400 focus:bg-white/60 focus:ring-cyan-400/50 shadow-sm",
  };

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden ${theme.container} relative`}>
      
      {/* 🟢 Booking Modal */}
      {bookingItem && (
        <BookingModal 
          resource={bookingItem} 
          user={user}
          onClose={() => setBookingItem(null)}
          onConfirm={(data) => {
             addReservation(data);
             alert("Booking Submitted! Check 'My Reservations'.");
          }}
        />
      )}

      {/* 🟢 History Modal (Now using REAL Data) */}
      {showHistory && (
        <StudentHistoryPanel 
          history={myReservations} 
          onClose={() => setShowHistory(false)} 
          theme={theme}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-20 md:w-64 flex flex-col p-6 border-r z-20 ${theme.sidebar}`}>
        <div className="flex items-center gap-2 mb-10 px-2 justify-center md:justify-start">
            <h1 className={`hidden md:block text-2xl font-black text-slate-700`}>Gimme<span className={'text-cyan-500'}>Lab</span></h1>
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
            <header className="flex justify-between items-center px-8 py-6">
              <div>
                <h2 className={`text-2xl font-bold ${theme.textMain}`}>Resource Hub</h2>
                <p className={`text-sm ${theme.textSub}`}>Welcome, {user?.name || 'Student'}</p>
              </div>
              <div 
                  className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-xl bg-white/40 border border-white/50 hover:bg-white/60 shadow-sm`}
                  onClick={() => setShowHistory(true)}
                >
                  <span className={`text-sm font-medium ${theme.textMain}`}>My Reservations ({myReservations.length})</span>
              </div>
            </header>

            <div className="px-8 pb-8 flex-1 overflow-hidden flex flex-col">
              <div className={`flex-1 rounded-3xl overflow-hidden flex flex-col bg-white/30 backdrop-blur-md border border-white/50 shadow-xl`}>
                
                {/* Filters */}
                <div className={`p-6 border-b border-white/40 flex gap-4`}>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..." 
                      className={`flex-1 p-3 rounded-xl outline-none ${theme.input}`}
                    />
                     <select className={`p-3 rounded-xl ${theme.input}`} onChange={e=>setSelectedFaculty(e.target.value)}>{departments.map(d=><option key={d}>{d}</option>)}</select>
                     <select className={`p-3 rounded-xl ${theme.input}`} onChange={e=>setSelectedType(e.target.value)}>{types.map(t=><option key={t}>{t}</option>)}</select>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 gap-4">
                    {filteredResources.map((item) => (
                      <div key={item.id} className={`flex p-4 rounded-2xl border ${theme.card}`}>
                         <img src={item.image} className="w-24 h-24 rounded-xl object-cover" />
                         <div className="flex-1 px-4">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.department} • Qty: {item.quantity}</p>
                            <p className="text-sm mt-2">{item.details}</p>
                         </div>
                         <div className="flex flex-col justify-center">
                            <button 
                                onClick={() => setBookingItem(item)} // 🟢 Open Booking Modal
                                className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
                            >
                                Reserve
                            </button>
                         </div>
                      </div>
                    ))}
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

// 🟢 Updated History Panel to show real status
const StudentHistoryPanel = ({ history, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl bg-[#F0F4F8] border border-white shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-slate-800">My Reservations</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-left">
            <thead>
               <tr className="text-sm text-slate-500 border-b"><th className="pb-3">Resource</th><th className="pb-3">Time</th><th className="pb-3">Status</th></tr>
            </thead>
            <tbody>
              {history.length === 0 && <tr><td colSpan="3" className="p-4 text-center text-slate-400">No reservations yet.</td></tr>}
              {history.map((record) => (
                <tr key={record.id} className="border-b border-slate-200">
                  <td className="py-4 font-bold text-slate-700">{record.resourceName}</td>
                  <td className="py-4 text-sm text-slate-500">{record.date} <br/> {record.timeSlot}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${record.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                        record.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                        'bg-red-100 text-red-600'}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white shadow text-cyan-600' : 'text-slate-500 hover:bg-white/50'}`}>
    {icon} <span>{label}</span>
  </div>
);

export default StudentResourceHub;