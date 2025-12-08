import { useState } from 'react';

export const useMockAuth = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Basic Validation Logic
  const validate = (formData, isLogin) => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password min length is 6.";
    }
    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Auth Handler (Login/Register)
  const authenticate = async (isLogin, role, formData) => {
    if (!validate(formData, isLogin)) return;

    setLoading(true);
    setErrors({}); // Clear previous global errors

    // Simulate Network Delay
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('gimmeLabUsers') || '[]');
      let user = null;

      if (isLogin) {
        user = storedUsers.find(
          u => u.email === formData.email && u.password === formData.password && u.role === role
        );
        if (!user) {
          setErrors({ form: "Invalid credentials or incorrect role." });
          setLoading(false);
          return;
        }
      } else {
        const exists = storedUsers.find(u => u.email === formData.email);
        if (exists) {
          setErrors({ email: "User already exists." });
          setLoading(false);
          return;
        }
        user = { ...formData, role };
        localStorage.setItem('gimmeLabUsers', JSON.stringify([...storedUsers, user]));
      }

      setLoading(false);
      if (onSuccess) onSuccess(user);
    }, 1500);
  };

  return { loading, errors, setErrors, authenticate };
};