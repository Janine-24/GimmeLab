// pages/HomePage.jsx
import React, { useState } from 'react';

// Import modular parts
import Navbar from '../components/Navbar';
import ReservationSection from '../sections/ReservationSection';
import StudentDashboard from '../sections/StudentDashboard';
import AdminDashboard from '../sections/AdminDashboard';

// --- Configuration Constants ---
const STUDENT_TABS = [
  { id: 'dashboard', label: 'My Dashboard' },
  { id: 'reservations', label: 'Book Equipment' }
];

const ADMIN_TABS = [
  { id: 'admin-dashboard', label: 'Overview' },
  { id: 'manage-reservations', label: 'All Reservations' }, // Admin sees everyone's bookings
  { id: 'lab-settings', label: 'Lab Settings' }
];

export default function HomePage() {
  // 1. Get User Info
  const user = JSON.parse(localStorage.getItem('activeUser')) || { name: 'Guest', role: 'student' };
  const isAdmin = user.role.toLowerCase() === 'admin';

  // 2. Set Default Tab based on role
  const [activeTab, setActiveTab] = useState(isAdmin ? 'admin-dashboard' : 'dashboard');

  // 3. Determine which tabs to pass to Navbar
  const currentTabs = isAdmin ? ADMIN_TABS : STUDENT_TABS;

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans p-4 md:p-6">
      
      {/* Background Ambience (Reusable) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* --- MODULAR NAVBAR --- */}
        {/* We pass the role-specific tabs here */}
        <Navbar 
          user={user} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          tabs={currentTabs} 
        />

        {/* --- CONTENT SWITCHER --- */}
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* --- STUDENT VIEWS --- */}
          {activeTab === 'dashboard' && (
            <StudentDashboard onBookClick={() => setActiveTab('reservations')} />
          )}
          
          {activeTab === 'reservations' && <ReservationSection />}

          {/* --- ADMIN VIEWS --- */}
          {activeTab === 'admin-dashboard' && (
            <AdminDashboard />
          )}
          
          {/* Reuse ReservationSection or add a TableView for Admin later */}
          {activeTab === 'manage-reservations' && <ReservationSection />}
          
        </main>
      </div>
    </div>
  );
}
