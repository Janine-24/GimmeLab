import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // Import Context

export default function LoginPage() {
  const { login, register } = useApp();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
        let user;
        if (isLogin) {
            user = login(formData.email, formData.password);
        } else {
            user = register({ ...formData, role }); // Save role on register
        }

        // Redirect based on role
        if (user.role === 'admin') navigate('/adminHome');
        else navigate('/studentHome');

    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
        {/* Simple Login UI for brevity */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white z-10">
            <h2 className="text-3xl font-black text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                {isLogin ? 'Welcome Back' : 'Join GimmeLab'}
            </h2>

            {/* Role Toggle (Only show on Register) */}
            {!isLogin && (
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                    {['student', 'admin'].map(r => (
                        <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${role === r ? 'bg-white shadow text-cyan-600' : 'text-slate-400'}`}>
                            {r}
                        </button>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <input className="w-full p-3 rounded-xl bg-slate-50 border outline-none focus:ring-2 ring-cyan-200" placeholder="Full Name" 
                    value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} required />
                )}
                <input className="w-full p-3 rounded-xl bg-slate-50 border outline-none focus:ring-2 ring-cyan-200" placeholder="Email" type="email"
                    value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} required />
                <input className="w-full p-3 rounded-xl bg-slate-50 border outline-none focus:ring-2 ring-cyan-200" placeholder="Password" type="password"
                    value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})} required />
                
                {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}

                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">
                    {isLogin ? 'Login' : 'Create Account'}
                </button>
            </form>
            
            <p className="text-center mt-6 text-sm text-slate-500">
                {isLogin ? "No account? " : "Have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-600 font-bold underline">
                    {isLogin ? "Register" : "Log In"}
                </button>
            </p>
        </div>
    </div>
  );
}