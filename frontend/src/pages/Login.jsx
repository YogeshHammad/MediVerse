import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN LOGIC
        const { data } = await API.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('user', JSON.stringify(data));
        alert('Login Successful!');
        navigate('/dashboard'); // We will build this next
      } else {
        // REGISTER LOGIC
        await API.post('/auth/register', formData);
        alert('Registration Successful! Please Login.');
        setIsLogin(true); // Switch to login view
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          {isLogin ? 'Welcome Back' : 'Join MediVerse'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Show Name field only if Registering */}
          {!isLogin && (
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-lg focus:outline-primary"
                placeholder="John Doe"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-lg focus:outline-primary"
              placeholder="admin@hospital.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-lg focus:outline-primary"
              placeholder="******"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary font-bold underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;