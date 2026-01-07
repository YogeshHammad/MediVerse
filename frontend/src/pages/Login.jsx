import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, ChevronLeft, AlertCircle, CheckCircle, Loader2, UserPlus, LogIn } from 'lucide-react';
import API from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('patient'); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ show: false, message: '', type: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setStatus({ show: true, message: isRegister ? 'Creating Account...' : 'Signing In...', type: 'loading' });

    try {
      if (isRegister) {
        // REGISTER FLOW
        await API.post('/auth/register', formData);
        setStatus({ show: true, message: "Success! Now please login.", type: 'success' });
        setTimeout(() => {
          setIsRegister(false); 
          setStatus({ show: false });
        }, 2000);
      } else {
        // LOGIN FLOW
        const { data } = await API.post('/auth/login', formData);

        // Save session so Dashboard can see it
        localStorage.setItem('token', data.token); 
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('patientId', data.user._id);

        setStatus({ show: true, message: `Welcome ${data.user.name}!`, type: 'success' });
        
        // NAVIGATE TO DASHBOARD
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Oops! Something went wrong.";
      setStatus({ show: true, message: errorMsg, type: 'error' });
      setTimeout(() => setStatus({ show: false }), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* SUCCESS/ERROR POPUP (Your existing style) */}
      {status.show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center max-w-sm border-t-8 border-blue-600">
            {status.type === 'loading' && <Loader2 className="mx-auto animate-spin text-blue-600 mb-4" size={50}/>}
            {status.type === 'success' && <CheckCircle className="mx-auto text-green-500 mb-4" size={50}/>}
            {status.type === 'error' && <AlertCircle className="mx-auto text-red-500 mb-4" size={50}/>}
            <h3 className="text-xl font-bold">{status.message}</h3>
          </div>
        </div>
      )}

      {/* Your Original Layout UI */}
      <div className="max-w-5xl w-full bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side (Branding) */}
        <div className="md:w-5/12 p-12 bg-blue-600 text-white flex flex-col justify-between">
          <div>
            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
               <Activity size={32} />
            </div>
            <h2 className="text-4xl font-black">Patient & Staff Access Portal</h2>
          </div>
          <p className="opacity-60 text-xs font-bold uppercase tracking-widest leading-loose">MediVerse Cloud v2.1.0</p>
        </div>

        {/* Right Side (Form) */}
        <div className="md:w-7/12 p-12 md:p-16">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-10">
            <button onClick={() => setRole('patient')} className={`flex-1 py-3 rounded-xl font-bold ${role==='patient'?'bg-white text-blue-600 shadow-sm':'text-slate-400'}`}>Patient</button>
            <button onClick={() => setRole('admin')} className={`flex-1 py-3 rounded-xl font-bold ${role==='admin'?'bg-white text-slate-900 shadow-sm':'text-slate-400'}`}>Admin</button>
          </div>

          <h3 className="text-3xl font-black text-slate-800 mb-2">{isRegister ? "Create Account" : "Welcome Back"}</h3>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {isRegister && (
              <input required placeholder="Full Name" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-600" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
            )}
            <input required type="email" placeholder="Email Address" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-600" 
              onChange={e => setFormData({...formData, email: e.target.value})} />
            <input required type="password" placeholder="Password" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-600" 
              onChange={e => setFormData({...formData, password: e.target.value})} />
            
            <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-3">
              {isRegister ? "Register Now" : "Sign In"} <ArrowRight size={20}/>
            </button>
          </form>

          <button onClick={() => setIsRegister(!isRegister)} className="mt-8 w-full text-blue-600 font-black hover:underline">
            {isRegister ? "Already have an account? Sign In" : "Don't have an account? Create a New Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;