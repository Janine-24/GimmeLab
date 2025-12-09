import React from 'react';
import { useReservation } from '../hooks/useReservation';
import CalendarGrid from '../components/CalendarGrid';
import BookingForm from '../components/BookingForm';
import { X } from 'lucide-react'; // Icon for toast close

const ReservationSection = () => {
  const { state, actions, helpers } = useReservation();

  return (
    <div className="animate-fade-in relative">
      
      {/* Toast Notification */}
      {state.notification && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg shadow-lg text-sm font-medium">
          {state.notification.message}
          <button onClick={() => actions.setNotification(null)}><X size={14} /></button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <CalendarGrid 
            currentDate={state.currentDate}
            selectedDate={state.selectedDate}
            selectedLab={state.selectedLab}
            bookings={state.bookings}
            onSelectDate={actions.setSelectedDate}
            onNavigate={actions.navigateMonth}
          />
        </div>

        <div className="lg:col-span-5">
          <BookingForm 
            selectedDate={state.selectedDate}
            selectedLab={state.selectedLab}
            onLabChange={actions.setSelectedLab}
            isAvailable={helpers.isSlotAvailable(state.selectedDate, state.selectedLab)}
            onSubmit={actions.submitBooking}
            loading={state.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationSection;