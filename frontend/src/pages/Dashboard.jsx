import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut, Calendar, User, MessageCircle, Clock, FileText, Bell } from 'lucide-react';
import API from '../api';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || "Patient";
  const patientId = localStorage.getItem('patientId');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchMyVisits = async () => {
      try {
        const res = await API.get(`/appointments?userId=${patientId}&role=patient`);
        setAppointments(res.data);
      } catch (err) { console.log("Fetch Error", err); }
    };
    if (patientId) fetchMyVisits();
  }, [patientId]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-8 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-3 text-blue-600 font-black text-2xl mb-12"><Activity size={32} /> MediVerse</div>
          <nav className="space-y-4">
            <button className="flex items-center gap-4 w-full p-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg"><User size={20}/> My Profile</button>
            <button className="flex items-center gap-4 w-full p-4 text-slate-400 hover:bg-slate-50 font-black rounded-2xl transition-all"><Calendar size={20}/> My Visits</button>
            <button className="flex items-center gap-4 w-full p-4 text-slate-400 hover:bg-slate-50 font-black rounded-2xl transition-all"><FileText size={20}/> My Reports</button>
          </nav>
        </div>
        <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="flex items-center gap-4 w-full p-4 text-red-500 font-black hover:bg-red-50 rounded-2xl transition-all"><LogOut size={20}/> Logout</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div><h1 className="text-4xl font-black text-slate-800 tracking-tight">Welcome, {userName}!</h1><p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Medical Dashboard System</p></div>
          <button onClick={() => navigate('/book-appointment')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all">
            + Book Appointment
          </button>
        </header>

        {/* ACTIVITY & REPORTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2"><Clock className="text-blue-600" /> Recent Activity</h3>
            <div className="space-y-6">
              {appointments.length > 0 ? appointments.map((appt, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm font-black italic">M</div>
                    <div>
                      <h4 className="font-black text-lg text-slate-800">Dr. {appt.doctorName}</h4>
                      <p className="text-slate-400 font-bold text-sm italic">{appt.date} • {appt.time}</p>
                    </div>
                  </div>
                  <span className="px-5 py-2 bg-green-100 text-green-600 rounded-full font-black text-xs uppercase tracking-widest">{appt.status}</span>
                </div>
              )) : (
                <p className="text-center py-10 text-slate-300 font-black">No Recent Activity</p>
              )}
            </div>
          </section>

          <aside className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl">
              <Activity className="text-blue-400 mb-4" />
              <h3 className="font-bold opacity-60 uppercase text-xs">Patient Status</h3>
              <p className="text-2xl font-black mt-2">Online & Verified</p>
            </div>
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="font-black text-slate-800 mb-4">Quick Reports</h3>
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                <div className="bg-red-100 text-red-500 p-3 rounded-xl"><FileText size={20}/></div>
                <div><p className="font-black text-sm">Blood_Test_01.pdf</p><p className="text-[10px] text-slate-400 font-bold uppercase">Jan 02, 2026</p></div>
              </div>
            </div>
          </aside>
        </div>

        {/* ATTRACTIVE HELP BUTTON */}
        <button className="fixed bottom-10 right-10 bg-blue-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 group">
          <MessageCircle size={28} strokeWidth={3}/>
          <span className="absolute right-20 bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-xl font-black text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Help Desk</span>
        </button>
      </main>
    </div>
  );
};
export default Dashboard;