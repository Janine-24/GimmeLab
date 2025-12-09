import React from 'react';
import { AppProvider } from './context/AppContext';
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx"; // adjust path if needed
import StudentHomePage from "./pages/StudentHomePage.jsx";  
import StudentResourcesHub from "./pages/StudentResourcesHub.jsx";
import AdminResourcesHub from './pages/AdminResourcesHub.jsx';
import AdminHomePage from "./pages/AdminHomePage.jsx";       


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/studentHome" element={<StudentResourcesHub />} />\
          <Route path="/adminHome" element={<AdminResourcesHub />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
