import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx"; // adjust path if needed
import StudentHomePage from "./pages/StudentHomePage.jsx";  
import AdminHomePage from "./pages/AdminHomePage.jsx";       

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/studentHome" element={<StudentHomePage />} /> 
        <Route path="/adminHome" element={<AdminHomePage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
