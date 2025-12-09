import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarGrid = ({ currentDate, selectedDate, selectedLab, bookings, onSelectDate, onNavigate }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // Generate days array
  const days = Array.from({ length: firstDay }).fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)));

  const isBooked = (date) => {
    if (!date) return false;
    return bookings.some(b => b.date === date.toDateString() && b.lab === selectedLab);
  };

  const isSelected = (date) => date && date.toDateString() === selectedDate.toDateString();

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          <button onClick={() => onNavigate(-1)} className="p-2 hover:bg-white rounded-md transition shadow-sm"><ChevronLeft size={16} /></button>
          <button onClick={() => onNavigate(1)} className="p-2 hover:bg-white rounded-md transition shadow-sm"><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <span key={d} className="text-xs font-bold text-slate-400 uppercase">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 place-items-center">
        {days.map((date, idx) => {
          if (!date) return <div key={idx} />;
          const booked = isBooked(date);
          const active = isSelected(date);
          
          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all relative
                ${active 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30' 
                  : booked 
                    ? 'bg-red-50 text-red-500 border border-red-200' 
                    : 'bg-white/50 hover:bg-white hover:scale-110 border border-slate-100'
                }`}
            >
              {date.getDate()}
              {booked && !active && <span className="absolute bottom-1 right-3.5 w-1 h-1 bg-red-500 rounded-full" />}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 mt-6 justify-center text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan-500" /> Selected</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Booked</span>
      </div>
    </div>
  );
};

export default CalendarGrid;