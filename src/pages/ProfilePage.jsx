import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Camera, Save } from 'lucide-react';
import { useApp } from '../context/AppContext'; // 核心修改：引入全局状态

const ProfilePage = () => {
  const { user, updateProfile } = useApp(); // 获取当前登录用户
  
  const [formData, setFormData] = useState({
      name: '', email: '', password: '', role: '', image: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // 当 user 变化时（比如刚加载），更新表单数据
  useEffect(() => {
      if(user) {
          setFormData({
              ...user,
              image: user.image || 'https://tse1.mm.bing.net/th/id/OIP.gzG_QeF2mI8AEcfoEqkJigHaHa?pid=Api&P=0&h=180'
          });
      }
  }, [user]);

  const handleSave = () => {
      updateProfile(formData);
      alert("Profile updated!");
  };

  const handlePhotoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setFormData({ ...formData, image: reader.result });
        reader.readAsDataURL(file);
      }
  }

  if (!user) return <div className="p-10">Please log in.</div>;

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#F0F4F8] h-full">
       <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl">
           
           <div className="flex flex-col items-center -mt-16 mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden relative group">
                    <img src={formData.image} className="w-full h-full object-cover" alt="Profile" />
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                        <Camera className="text-white"/>
                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload}/>
                    </label>
                </div>
                <h2 className="text-2xl font-bold mt-4 text-slate-800">{formData.name}</h2>
                <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{formData.role}</span>
           </div>

           <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Full Name</label>
                    <input className="w-full p-3 rounded-xl bg-white/60 border border-white/50 focus:ring-2 ring-cyan-400/30 outline-none" 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                    <input className="w-full p-3 rounded-xl bg-slate-100 border border-white/50 text-slate-500 cursor-not-allowed" 
                        value={formData.email} disabled readOnly 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Password</label>
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} className="w-full p-3 rounded-xl bg-white/60 border border-white/50 focus:ring-2 ring-cyan-400/30 outline-none" 
                            value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                        <button onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-cyan-600">
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>
                </div>
           </div>

           <button onClick={handleSave} className="w-full mt-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition-colors flex justify-center items-center gap-2">
                <Save size={18}/> Save Changes
           </button>
       </div>
    </div>
  );
};

export default ProfilePage;