// context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as API from '../services/mockBackend';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Resources State ---
  const [resources, setResources] = useState([]);
  const [triggerSync, setTriggerSync] = useState(0); // Helper to force updates

  useEffect(() => {
    // Load initial data
    setResources(API.getResourcesAPI());
  }, [triggerSync]);

  const handleSaveResource = (resourceData) => {
    const updatedList = API.saveResourceAPI(resourceData);
    setResources(updatedList); // Update State -> Triggers Re-render in Student & Admin
  };

  const handleDeleteResource = (id) => {
    const updatedList = API.deleteResourceAPI(id);
    setResources(updatedList);
  };

  // --- Auth State ---
  const [user, setUser] = useState(API.getCurrentUserAPI());

  const login = (email, pass) => {
    const loggedUser = API.loginAPI(email, pass);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = (data) => {
    const newUser = API.registerAPI(data);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    API.logoutAPI();
    setUser(null);
  };
  
  const updateProfile = (newData) => {
      const updated = API.updateProfileAPI(newData);
      setUser(updated);
  }

  return (
    <AppContext.Provider value={{ 
      resources, 
      saveResource: handleSaveResource, 
      deleteResource: handleDeleteResource,
      user,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);