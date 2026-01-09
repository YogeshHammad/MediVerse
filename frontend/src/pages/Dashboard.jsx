import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Activity, LogOut, LayoutDashboard, Droplet, FlaskConical } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logged out successfully!");
    navigate('/'); 
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col p-6 z-10">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-10 flex items-center gap-3">
          <Activity className="text-blue-600" /> MediVerse
        </h1>

        <nav className="flex-1 space-y-3 font-medium">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-700 rounded-xl transition-all shadow-sm">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          
          <button onClick={() => navigate('/patients')} className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-100 hover:text-blue-700 rounded-xl transition-all">
            <Users size={20} /> Patients
          </button>

          <button onClick={() => navigate('/appointments')} className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-100 hover:text-blue-700 rounded-xl transition-all">
            <Calendar size={20} /> Appointments
          </button>

          <button onClick={() => navigate('/doctors')} className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-100 hover:text-blue-700 rounded-xl transition-all">
            <Activity size={20} /> Doctors Status
          </button>

          <button onClick={() => navigate('/inventory')} className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-100 hover:text-blue-700 rounded-xl transition-all">
            <Droplet size={20} /> Blood & Bed Status
          </button>

          <button onClick={() => navigate('/lab-tests')} className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-100 hover:text-blue-700 rounded-xl transition-all">
            <FlaskConical size={20} /> Lab Reports
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 mt-auto p-3 hover:bg-red-50 rounded-xl transition-all font-bold">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA (Updated) */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-full flex flex-col">
          
          {/* New Header */}
          <div className="mb-8">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MediVerse</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl">
              Your central hub for managing hospital operations, patients, and resources efficiently.
            </p>
          </div>
          
          {/* 🏥 Beautiful Hospital Image Area */}
          <div className="flex-1 w-full rounded-3xl overflow-hidden shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Modern Hospital Building" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Overlay Gradient for Aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
               <h3 className="text-white text-3xl font-bold drop-shadow-lg">Advancing Healthcare Together</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;