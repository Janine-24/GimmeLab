import React, { createContext, useContext, useState, useEffect } from 'react';
// We will use localStorage directly for simplicity in this version
// (You can swap this with Firebase later easily)

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Resources State ---
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('gimme_resources');
    return saved ? JSON.parse(saved) : [
        { id: 1, title: "Robotics Lab Kit A", department: "FOE", type: "Kit", details: "Includes Arduino Mega", quantity: 5, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200" },
        { id: 2, title: "3D Printer (Prusa MK3)", department: "FCI", type: "Equipment", details: "Filament provided", quantity: 2, image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=200" },
        // ... add other default items if you want
    ];
  });

  // --- Reservations State (The New Part) ---
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('gimme_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  // --- User State ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gimme_user');
    return saved ? JSON.parse(saved) : null;
  });

  // --- Effects to Auto-Save to LocalStorage ---
  useEffect(() => {
    localStorage.setItem('gimme_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('gimme_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (user) localStorage.setItem('gimme_user', JSON.stringify(user));
    else localStorage.removeItem('gimme_user');
  }, [user]);

  // --- Actions ---

  // 1. Resources
  const saveResource = (resource) => {
    if (resource.id) {
      setResources(resources.map(r => r.id === resource.id ? resource : r));
    } else {
      setResources([...resources, { ...resource, id: Date.now() }]);
    }
  };

  const deleteResource = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  // 2. Reservations (NEW)
  const addReservation = (bookingData) => {
    // Booking Data expects: { resourceId, resourceName, date, timeSlot }
    const newBooking = {
      id: Date.now(),
      userId: user.email, // We use email as ID for simplicity
      userName: user.name,
      status: "Pending", // Default status
      timestamp: new Date().toISOString(),
      ...bookingData
    };
    setReservations([...reservations, newBooking]);
    return newBooking;
  };

  const updateReservationStatus = (id, newStatus) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: newStatus } : r
    ));
  };

  // 3. Auth
  const login = (email, password) => {
    const mockUser = { name: email.split('@')[0], email, role: email.includes("admin") ? "admin" : "student" };
    setUser(mockUser);
    return mockUser;
  };

  const register = (data) => {
    setUser(data);
    return data;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ 
      resources, saveResource, deleteResource,
      reservations, addReservation, updateReservationStatus,
      user, login, register, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);