import { useState } from 'react';

// Mock Data
const MOCK_BOOKINGS = [
  { id: 1, date: new Date().toDateString(), lab: 'Lab A - Robotics' },
  { id: 2, date: new Date(new Date().setDate(new Date().getDate() + 2)).toDateString(), lab: 'Lab A - Robotics' },
];

export const useReservation = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Calendar view month
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLab, setSelectedLab] = useState('Lab A - Robotics');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Helpers
  const isSlotAvailable = (date, lab) => {
    return !bookings.some(b => 
      b.date === date.toDateString() && b.lab === lab
    );
  };

  const submitBooking = () => {
    if (!isSlotAvailable(selectedDate, selectedLab)) return;

    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      const newBooking = {
        id: Date.now(),
        date: selectedDate.toDateString(),
        lab: selectedLab,
      };
      setBookings((prev) => [...prev, newBooking]);
      setNotification({ type: 'success', message: 'Reservation Confirmed!' });
      setLoading(false);
    }, 800);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  return {
    state: { currentDate, selectedDate, selectedLab, bookings, loading, notification },
    actions: { setSelectedDate, setSelectedLab, setNotification, submitBooking, navigateMonth },
    helpers: { isSlotAvailable }
  };
};