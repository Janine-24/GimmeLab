import React, { useState } from 'react';
import { Eye, EyeOff, Camera, Image as ImageIcon } from 'lucide-react';

const ProfilePage = () => {
  const [name, setName] = useState('hhh');
  const [email, setEmail] = useState('hhh@23xample.com');
  const [password, setPassword] = useState('mysecretpassword');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://tse1.mm.bing.net/th/id/OIP.gzG_QeF2mI8AEcfoEqkJigHaHa?pid=Api&P=0&h=180'); // Default profile photo
  const [backgroundPhoto, setBackgroundPhoto] = useState('https://images.unsplash.com/photo-1501854140801-50d0069872fd?auto=format&fit=crop&q=80&w=1920&h=400'); // Default background photo

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChanges = () => {
    // In a real application, you would send this data to a backend
    console.log('Saving changes:', { name, email, password, profilePhoto, backgroundPhoto });
    alert('Profile updated successfully!');
  };

  // Theme-like styling for consistency
  const theme = {
    textMain: "text-slate-800",
    textSub: "text-slate-500",
    input: "bg-white/40 border-white/50 text-slate-700 placeholder-slate-400 focus:bg-white/60 focus:ring-cyan-400/50 shadow-sm",
    buttonPrimary: "bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-cyan-500/40 hover:scale-[1.02] text-white font-bold py-2 px-4 rounded-xl transition-all shadow-lg",
    card: "bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/40",
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        {/* Background Photo Section */}
        <div
          className="relative h-48 rounded-3xl overflow-hidden mb-8 shadow-xl"
          style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <label htmlFor="background-upload" className="cursor-pointer text-white bg-black/50 px-4 py-2 rounded-full flex items-center gap-2">
              <ImageIcon size={20} /> Change Background
            </label>
            <input
              id="background-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBackgroundPhotoChange}
            />
          </div>
        </div>

        {/* Profile Card */}
        <div className={`relative ${theme.card} p-8 rounded-3xl -mt-24 mb-8 z-10`}>
          {/* Profile Photo */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative group">
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              <label htmlFor="profile-photo-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <Camera size={30} className="text-white" />
              </label>
              <input
                id="profile-photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePhotoChange}
              />
            </div>
          </div>

          <div className="pt-20 text-center">
            <h2 className={`text-3xl font-bold ${theme.textMain} mb-2`}>{name}</h2>
            <p className={`text-lg ${theme.textSub}`}>{email}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${theme.textSub} mb-2`}>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 rounded-xl outline-none ${theme.input}`}
              />
            </div>

            {/* Gmail Input */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${theme.textSub} mb-2`}>Gmail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 rounded-xl outline-none ${theme.input}`}
              />
            </div>

            {/* Password Input */}
            <div className="md:col-span-2">
              <label htmlFor="password" className={`block text-sm font-medium ${theme.textSub} mb-2`}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 rounded-xl outline-none pr-10 ${theme.input}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-cyan-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleSaveChanges} className={theme.buttonPrimary}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;