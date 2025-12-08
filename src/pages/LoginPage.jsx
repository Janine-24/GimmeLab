import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import modular parts
import NeonInput from '../components/NeonInput.jsx';
import RoleSelector from '../components/roleSelectionTab.jsx';
import { useMockAuth } from '../hooks/useMockAuth.js';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const navigate = useNavigate(); // HOOK INITIALIZED
 
  // Custom hook handles the heavy lifting
  const { loading, errors, setErrors, authenticate } = useMockAuth((user) => {
    // 1. Save user to session storage (simulated persistence)
    // Note: In a real app, you'd use a Context Provider or Redux here.
    const currentUsers = JSON.parse(localStorage.getItem('gimmeLabUsers') || '[]');
    // Ensure we mark this specific user as "active" for the HomePage to read
    // For this Mock MVP, we just assume the last user in the array is active, 
    // or you can set a specific 'activeUser' key:
    localStorage.setItem('activeUser', JSON.stringify(user));

    // 2. Navigate to Home Page
    if (user.role === 'student') {
      navigate('/studentHome');
    } else if (user.role === 'admin') {
      navigate('/adminHome');
    } else {
      navigate('/');
    }
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific field error on type
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate(isLogin, role, formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      {/* Main Card */}
      <div className="w-full max-w-md relative z-10 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="p-8 pb-4 text-center">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-fuchsia-600">
            GimmeLab
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            {isLogin ? 'Access your futuristic workspace' : 'Join the platform'}
          </p>
        </div>

        {/* Form Container */}
        <div className="px-8 pb-8">
            <RoleSelector 
            selected={role} 
            onSelect={(newRole) => setRole(newRole)} 
          />
          <form onSubmit={handleSubmit} className="space-y-2">
            {!isLogin && (
              <NeonInput 
                label="Full Name" type="text" name="name" icon={User} 
                value={formData.name} onChange={handleInputChange} error={errors.name} 
              />
            )}
            
            <NeonInput 
              label="Email" type="email" name="email" icon={Mail} 
              value={formData.email} onChange={handleInputChange} error={errors.email} 
            />

            <NeonInput 
              label="Password" type="password" name="password" icon={Lock} 
              value={formData.password} onChange={handleInputChange} error={errors.password} 
            />

            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-500 text-sm text-center font-medium">
                {errors.form}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 rounded-xl text-white font-bold text-lg
                bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] transition-all duration-200 
                flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span className="relative z-10">{isLogin ? 'Login' : 'Create Account'}</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </>
              )}
            </button>
          </form>

          {/* Toggle Footer */}
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              {isLogin ? "New here? " : "Have an account? "}
              <button
                onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                className="font-bold text-cyan-600 hover:text-fuchsia-600 transition-colors"
              >
                {isLogin ? 'Register Now' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
        
        {/* Aesthetic Bottom Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400"></div>
      </div>
    </div>
  );
}