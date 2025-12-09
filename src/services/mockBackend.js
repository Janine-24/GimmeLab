// services/mockBackend.js

const RESOURCES_KEY = 'gimmeLab_resources';
const USERS_KEY = 'gimmeLab_users';
const CURRENT_USER_KEY = 'gimmeLab_currentUser';

// Initial Mock Data
const defaultResources = [
  {
    id: 1, title: "Robotics Lab Kit A", department: "FOE", type: "Kit",
    details: "Includes Arduino Mega", quantity: 5,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2, title: "3D Printer (Prusa MK3)", department: "FCI", type: "Equipment",
    details: "Filament provided", quantity: 2,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=200"
  },
  // ... add your other defaults here
];

// --- Resource API ---

export const getResourcesAPI = () => {
  const data = localStorage.getItem(RESOURCES_KEY);
  if (!data) {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(defaultResources));
    return defaultResources;
  }
  return JSON.parse(data);
};

export const saveResourceAPI = (resource) => {
  const resources = getResourcesAPI();
  if (resource.id) {
    // Edit Mode
    const index = resources.findIndex(r => r.id === resource.id);
    if (index !== -1) resources[index] = resource;
  } else {
    // Add Mode
    resource.id = Date.now(); // Generate ID
    resources.push(resource);
  }
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
  return resources;
};

export const deleteResourceAPI = (id) => {
  const resources = getResourcesAPI().filter(r => r.id !== id);
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources));
  return resources;
};

// --- Auth API ---

export const loginAPI = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  throw new Error("Invalid credentials");
};

export const registerAPI = (userData) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.find(u => u.email === userData.email)) {
    throw new Error("User already exists");
  }
  users.push(userData);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData)); // Auto login
  return userData;
};

export const getCurrentUserAPI = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
};

export const updateProfileAPI = (updatedUser) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    // Also update the main users array
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const index = users.findIndex(u => u.email === updatedUser.email); // using email as key for now
    if(index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return updatedUser;
}

export const logoutAPI = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};