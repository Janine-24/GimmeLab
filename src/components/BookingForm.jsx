import React from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const BookingForm = ({ selectedDate, selectedLab, onLabChange, isAvailable, onSubmit, loading }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-8 h-full flex flex-col justify-center">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Reservation Details</h3>
      
      <div className="space-y-6">
        {/* Lab Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Lab Unit</label>
          <select 
            value={selectedLab}
            onChange={(e) => onLabChange(e.target.value)}
            className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:border-cyan-400 font-medium text-slate-700 appearance-none"
          >
            <option>Lab A - Robotics</option>
            <option>Lab B - Chemistry</option>
            <option>Lab C - Physics</option>
          </select>
        </div>

        {/* Status Indicator */}
        <div className={`p-4 rounded-xl flex items-center gap-3 border transition-colors duration-300
          ${isAvailable ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {isAvailable ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <div>
            <p className="font-bold text-sm">{isAvailable ? 'Available' : 'Conflict Detected'}</p>
            <p className="text-xs opacity-80">
              {isAvailable ? `You can book ${selectedLab} for this date.` : 'Please select another date or lab.'}
            </p>
          </div>
        </div>

        {/* Date Summary */}
        <div className="flex items-center gap-3 p-4 bg-slate-100 rounded-xl text-slate-600 text-sm font-medium">
          <Calendar size={16} className="text-cyan-600" />
          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {/* Submit Action */}
        <button
          onClick={onSubmit}
          disabled={!isAvailable || loading}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Reservation'}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;