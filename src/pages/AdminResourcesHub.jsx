import React, { useState, useRef, useMemo } from 'react';
import { LayoutGrid, Users, Search, ChevronDown, Bell, Plus, Upload, Trash2, Save, X, CheckCircle, XCircle, Info } from 'lucide-react';
import ProfilePage from './ProfilePage';
import { useApp } from '../context/AppContext'; 

const AdminResourceHub = () => {
  const { resources, saveResource, deleteResource, reservations, updateReservationStatus } = useApp();
  
  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState('Overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Filter Logic
  const filteredResources = useMemo(() => resources.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery, resources]);

  // Notification Count
  const pendingCount = reservations.filter(r => r.status === 'Pending').length;

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden bg-[#F0F4F8] text-slate-600 relative`}>
        
        {/* Editor Modal */}
        {isEditModalOpen && (
            <ResourceEditorModal item={editingItem} onClose={() => setIsEditModalOpen(false)} onSave={saveResource} onDelete={deleteResource}/>
        )}

        {/* Admin Borrowing Panel */}
        {showAdminPanel && (
            <AdminBorrowingPanel 
                records={reservations} 
                onClose={() => setShowAdminPanel(false)}
                onUpdateStatus={updateReservationStatus}
            />
        )}

        {/* Sidebar */}
        <aside className={`w-64 flex flex-col p-6 border-r z-20 bg-white/40 backdrop-blur-xl`}>
           <h1 className="text-2xl font-black text-slate-700 mb-10">Gimme<span className="text-cyan-500">Admin</span></h1>
           <nav className="flex flex-col gap-2">
             <button onClick={() => setActivePage('Overview')} className={`p-3 rounded-xl flex gap-3 ${activePage === 'Overview' ? 'bg-white shadow text-cyan-600' : ''}`}><LayoutGrid size={20}/> Overview</button>
             <button onClick={() => setActivePage('Profile')} className={`p-3 rounded-xl flex gap-3 ${activePage === 'Profile' ? 'bg-white shadow text-cyan-600' : ''}`}><Users size={20}/> Profile</button>
           </nav>
        </aside>

        <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
            {activePage === 'Overview' && (
                <>
                <header className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Inventory Manager</h2>
                        <p className="text-sm text-slate-500">Manage resources, faculty allocation, and descriptions.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => { setEditingItem(null); setIsEditModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl hover:bg-slate-900 shadow-lg"><Plus size={18} /> Add New</button>
                        
                        <div onClick={() => setShowAdminPanel(true)} className="relative p-3 bg-white border rounded-xl cursor-pointer hover:bg-slate-50">
                             <Bell size={20} />
                             {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">{pendingCount}</span>}
                        </div>
                    </div>
                </header>

                <div className="px-8 pb-8 flex-1 overflow-hidden flex flex-col">
                    {/* Search Bar */}
                    <div className="mb-6 relative">
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 p-3 rounded-xl bg-white/60 border border-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 gap-4 bg-white/30 rounded-3xl border border-white/50 shadow-xl">
                        {filteredResources.map((item) => (
                            <div key={item.id} className="bg-white/60 p-4 rounded-2xl flex items-start gap-4 border border-white hover:shadow-md transition-all">
                                {/* Image */}
                                <img src={item.image} className="w-20 h-20 rounded-lg object-cover bg-slate-100" />
                                
                                {/* Info Section - RECOVERED FIELDS */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                                    
                                    {/* Faculty & Type Row */}
                                    <div className="flex flex-wrap gap-2 my-1">
                                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
                                            {item.department}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200">
                                            {item.type}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                                            Qty: {item.quantity}
                                        </span>
                                    </div>

                                    {/* Description/Details Row */}
                                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                        <span className="font-semibold text-slate-400 mr-1">Desc:</span>
                                        {item.details}
                                    </p>
                                </div>

                                {/* Edit Button */}
                                <button onClick={() => { setEditingItem(item); setIsEditModalOpen(true); }} className="px-4 py-2 mt-2 bg-cyan-100 text-cyan-700 font-bold rounded-lg hover:bg-cyan-200 text-sm">
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                </>
            )}
            {activePage === 'Profile' && <ProfilePage />}
        </main>
    </div>
  );
};

// --- Admin Panel (Loans) ---
const AdminBorrowingPanel = ({ records, onClose, onUpdateStatus }) => {
  const sortedRecords = [...records].sort((a, b) => (a.status === 'Pending' ? -1 : 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl bg-[#F0F4F8] border border-white shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-slate-800">Loan Requests</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-slate-500 border-b"><th className="pb-3">Student</th><th className="pb-3">Item</th><th className="pb-3">Date/Time</th><th className="pb-3">Status</th><th className="pb-3 text-center">Action</th></tr>
            </thead>
            <tbody>
              {sortedRecords.length === 0 && <tr><td colSpan="5" className="p-4 text-center">No records found.</td></tr>}
              {sortedRecords.map(r => (
                <tr key={r.id} className="border-b border-slate-200 bg-white/50">
                  <td className="py-4 font-bold opacity-80">{r.userName}<br/><span className="text-xs font-normal opacity-50">{r.userId}</span></td>
                  <td className="py-4">{r.resourceName}</td>
                  <td className="py-4 text-sm opacity-70">{r.date}<br/>{r.timeSlot}</td>
                  <td className="py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${r.status==='Pending'?'bg-yellow-100 text-yellow-600': r.status==='Approved'?'bg-green-100 text-green-600':'bg-red-100 text-red-600'}`}>{r.status}</span></td>
                  <td className="py-4 flex justify-center gap-2">
                     {r.status === 'Pending' && (
                        <>
                            <button onClick={() => onUpdateStatus(r.id, 'Approved')} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200" title="Approve"><CheckCircle size={18}/></button>
                            <button onClick={() => onUpdateStatus(r.id, 'Rejected')} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Reject"><XCircle size={18}/></button>
                        </>
                     )}
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

// --- Resource Editor Modal (Recovered Fields Logic) ---
const ResourceEditorModal = ({ item, onClose, onSave, onDelete }) => {
    const isEdit = !!item;
    // Note: 'details' corresponds to Description, 'department' to Faculty
    const [formData, setFormData] = useState(item || { title: '', department: 'FOE', type: 'Equipment', quantity: 1, details: '', image: '' });
    
    const handleFileChange = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFormData({ ...formData, image: reader.result }); reader.readAsDataURL(file); }};
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); onClose(); };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-0 overflow-hidden">
                <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">{isEdit ? 'Edit Item' : 'Add New Item'}</h3>
                    <button onClick={onClose}><X className="text-slate-400 hover:text-slate-600"/></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Image Upload */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                            {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <Upload className="text-slate-400"/>}
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Resource Name</label>
                            <input className="w-full p-2 border rounded-lg bg-slate-50" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} required/>
                        </div>
                    </div>

                    {/* Faculty & Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Faculty</label>
                            <select className="w-full p-2 border rounded-lg bg-white" value={formData.department} onChange={e=>setFormData({...formData, department: e.target.value})}>
                                {['FOE', 'FCI', 'FCM', 'FOM', 'FAC', 'FCA', 'General'].map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                            <input className="w-full p-2 border rounded-lg" placeholder="e.g. Device" value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} required/>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Quantity</label>
                        <input className="w-full p-2 border rounded-lg" type="number" min="1" value={formData.quantity} onChange={e=>setFormData({...formData, quantity: parseInt(e.target.value)})} required/>
                    </div>

                    {/* Description (Details) */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Description / Details</label>
                        <textarea 
                            className="w-full p-2 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-cyan-200 outline-none" 
                            placeholder="Enter item specifications..." 
                            value={formData.details} 
                            onChange={e=>setFormData({...formData, details: e.target.value})} 
                        />
                    </div>

                    <div className="pt-4 flex justify-between border-t mt-2">
                        {isEdit ? (
                            <button type="button" onClick={() => { onDelete(item.id); onClose(); }} className="text-red-500 flex items-center gap-2 text-sm hover:underline"><Trash2 size={16}/> Delete</button>
                        ) : <div></div>}
                        <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-900 flex items-center gap-2"><Save size={18}/> Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminResourceHub;