import React, { useState } from 'react';
import { Calendar, Clock, X, Check } from 'lucide-react';

const BookingModal = ({ resource, user, onClose, onConfirm }) => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !timeSlot) return alert("Please fill in all fields");
    
    onConfirm({
      resourceId: resource.id,
      resourceName: resource.title,
      image: resource.image, // Save image for prettier history
      date,
      timeSlot
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Book Resource</h3>
          <button onClick={onClose}><X className="text-slate-400 hover:text-slate-600" /></button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 p-3 bg-cyan-50 rounded-xl border border-cyan-100">
            <img src={resource.image} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h4 className="font-bold text-slate-800">{resource.title}</h4>
              <p className="text-xs text-slate-500">{resource.department}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-slate-400" size={18}/>
                <input 
                  type="date" 
                  className="w-full pl-10 p-3 rounded-xl border border-slate-200 focus:ring-2 ring-cyan-400 outline-none"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">Select Time Slot</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-slate-400" size={18}/>
                <select 
                  className="w-full pl-10 p-3 rounded-xl border border-slate-200 focus:ring-2 ring-cyan-400 outline-none bg-white"
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                >
                  <option value="">Choose a slot...</option>
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
               <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all flex justify-center items-center gap-2">
                 Confirm Booking <Check size={18} />
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;