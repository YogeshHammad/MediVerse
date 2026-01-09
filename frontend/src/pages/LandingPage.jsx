import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; 
import { 
  Activity, Search, FlaskConical, CalendarCheck, 
  Bed, Droplet, User, Stethoscope, Clock, ShieldCheck, 
  Menu, X, ChevronRight, AlertCircle
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  // --- STATES & LOGIC (SAME AS BEFORE) ---
  const [doctorsList, setDoctorsList] = useState([]);
  const [beds, setBeds] = useState([]);
  const [blood, setBlood] = useState([]);
  
  // Modals
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  
  // Forms
  const [booking, setBooking] = useState({ patientName: '', mobile: '', doctorName: '', date: '', time: '' });
  const [labForm, setLabForm] = useState({ patientName: '', mobile: '', testType: 'Blood Test', date: '', time: '' });

  // Search Data
  const [searchMobile, setSearchMobile] = useState('');
  const [myAppointments, setMyAppointments] = useState(null);
  const [myTests, setMyTests] = useState(null);

  // Fetch Live Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRes = await API.get('/doctors');
        const invRes = await API.get('/inventory');
        setDoctorsList(docRes.data);
        setBeds(invRes.data.filter(item => item.type === 'Bed'));
        setBlood(invRes.data.filter(item => item.type === 'Blood'));
      } catch (error) { console.error("Error connecting to backend"); }
    };
    fetchData();
  }, []);

  // Handlers
  const handleBooking = async (e) => {
    e.preventDefault();
    try { await API.post('/appointments/book', booking); alert('✅ Appointment Sent!'); setShowBookingModal(false); } 
    catch (error) { alert('Error booking appointment.'); }
  };

  const handleLabBooking = async (e) => {
    e.preventDefault();
    try { await API.post('/tests/book', labForm); alert('✅ Lab Request Sent!'); setShowLabModal(false); } 
    catch (error) { alert('Error booking test.'); }
  };

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    try { const appRes = await API.get(`/appointments/status/${searchMobile}`); setMyAppointments(appRes.data); } catch (e) { setMyAppointments([]); }
    try { const testRes = await API.get(`/tests/search/${searchMobile}`); setMyTests(testRes.data); } catch (e) { setMyTests([]); }
    setShowStatusModal(true);
  };

  // --- ✨ NEW BEAUTIFUL UI STARTS HERE ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
      {/* 1. MODERN NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
              <Activity size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">MediVerse<span className="text-blue-600">.</span></h1>
          </div>

          <div className="hidden md:flex gap-4">
            <button onClick={() => navigate('/login')} className="px-5 py-2.5 font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">Staff Login</button>
            <button onClick={() => setShowStatusModal(true)} className="px-5 py-2.5 font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center gap-2"><Search size={18}/> Check Status</button>
            <button onClick={() => setShowLabModal(true)} className="px-5 py-2.5 bg-purple-100 text-purple-700 font-bold rounded-xl hover:bg-purple-200 transition-all flex items-center gap-2"><FlaskConical size={18}/> Book Test</button>
            <button onClick={() => setShowBookingModal(true)} className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2"><CalendarCheck size={18}/> Book Appointment</button>
          </div>
        </div>
      </nav>

      {/* 2. HERO HEADER */}
      <header className="relative bg-gradient-to-b from-white to-blue-50 pt-16 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Our Priority.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Check real-time availability of doctors & beds, book lab tests instantly, and track your reports online.
        </p>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Doctors Live", val: doctorsList.filter(d => d.availability === "Available").length, icon: User, color: "text-green-600", bg: "bg-green-100" },
            { label: "Beds Free", val: beds.reduce((acc, i) => acc + i.quantity, 0), icon: Bed, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Blood Units", val: blood.reduce((acc, i) => acc + i.quantity, 0), icon: Droplet, color: "text-red-600", bg: "bg-red-100" },
            { label: "Lab Open", val: "24/7", icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}> <stat.icon size={24} /> </div>
              <div className="text-left">
                <p className="text-2xl font-black text-slate-800">{stat.val}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* 3. LIVE DASHBOARD GRID */}
      <main className="max-w-7xl mx-auto px-6 -mt-12 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: DOCTOR LIST */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Stethoscope className="text-blue-600"/> Doctor Availability</h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">● Live Updates</span>
            </div>
            <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
              {doctorsList.length === 0 ? (
                 <div className="p-8 text-center text-slate-400">Loading doctors...</div>
              ) : (
                doctorsList.map((doc) => (
                  <div key={doc._id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {doc.name[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">Dr. {doc.name}</h3>
                        <p className="text-slate-500 text-sm font-medium">{doc.specialty}</p>
                      </div>
                    </div>
                    <div>
                      {doc.availability === 'Available' ? (
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                          <CheckCircle2 size={16}/> Available
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                          <Clock size={16}/> {doc.availability}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: INVENTORY & ACTIONS */}
          <div className="space-y-6">
            
            {/* Bed Status Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
              <Bed size={140} className="absolute -bottom-4 -right-4 opacity-10 rotate-12"/>
              <h3 className="text-blue-100 font-bold mb-1 uppercase tracking-widest text-sm">Real-time Status</h3>
              <div className="text-6xl font-black mb-2">{beds.reduce((acc, i) => acc + i.quantity, 0)}</div>
              <p className="text-xl font-bold mb-6">General Beds Available</p>
              <button onClick={() => setShowBookingModal(true)} className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                Book Bed / Appointment
              </button>
            </div>

            {/* Emergency / Blood Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Droplet className="text-red-500"/> Blood Bank Status</h3>
               <div className="space-y-3">
                 {blood.map((item, idx) => (
                   <div key={idx} className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                     <span className="font-bold text-red-900">{item.itemName}</span>
                     <span className="bg-white text-red-600 px-3 py-1 rounded-lg font-black shadow-sm">{item.quantity} Units</span>
                   </div>
                 ))}
                 {blood.length === 0 && <p className="text-slate-400 text-sm">Checking inventory...</p>}
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- MODALS (STYLED) --- */}
      {/* 1. APPOINTMENT MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full hover:bg-slate-200"><X size={20}/></button>
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><CalendarCheck className="text-blue-600"/> Book Appointment</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <input required placeholder="Patient Name" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setBooking({...booking, patientName: e.target.value})} />
              <input required placeholder="Mobile Number" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setBooking({...booking, mobile: e.target.value})} />
              <select className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setBooking({...booking, doctorName: e.target.value})}>
                <option value="">Select Doctor</option>
                {doctorsList.map(doc => <option key={doc._id} value={doc.name}>{doc.name} ({doc.specialty})</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setBooking({...booking, date: e.target.value})} />
                <input required type="time" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setBooking({...booking, time: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}

      {/* 2. STATUS MODAL */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
            <button onClick={() => { setShowStatusModal(false); setMyAppointments(null); setMyTests(null); }} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full hover:bg-slate-200"><X size={20}/></button>
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><Search className="text-blue-600"/> Track Request</h2>
            <form onSubmit={handleCheckStatus} className="flex gap-2 mb-6">
              <input required placeholder="Enter Mobile Number" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" value={searchMobile} onChange={e => setSearchMobile(e.target.value)} />
              <button type="submit" className="bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-blue-700">Search</button>
            </form>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {myAppointments && myAppointments.map(apt => (
                <div key={apt._id} className={`p-4 border-l-4 rounded-xl bg-slate-50 ${apt.status === 'Confirmed' ? 'border-green-500' : 'border-orange-500'}`}>
                   <p className="font-bold text-slate-800">📅 Dr. {apt.doctorName}</p>
                   <div className="flex justify-between mt-1">
                     <p className="text-xs text-slate-500">{new Date(apt.date).toLocaleDateString()} at {apt.time}</p>
                     <span className={`text-xs font-bold px-2 py-0.5 rounded ${apt.status==='Confirmed'?'bg-green-100 text-green-700':'bg-orange-100 text-orange-700'}`}>{apt.status}</span>
                   </div>
                </div>
              ))}
              
              {myTests && myTests.map(test => (
                <div key={test._id} className="p-4 border-l-4 border-purple-500 rounded-xl bg-slate-50">
                   <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-slate-800">🧪 {test.testType}</span>
                     <span className={`text-xs font-bold px-2 py-1 rounded ${test.status === 'Report Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{test.status}</span>
                   </div>
                   {test.status === 'Report Ready' && test.pdfPath && (
                      <a href={`http://localhost:5000/uploads/${test.pdfPath}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">Download Report</a>
                   )}
                </div>
              ))}
              
              {myAppointments?.length === 0 && myTests?.length === 0 && (
                <div className="text-center py-6 text-slate-400">
                  <AlertCircle className="mx-auto mb-2 opacity-50"/>
                  <p>No records found for this number.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. LAB MODAL (Same Style) */}
      {showLabModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
            <button onClick={() => setShowLabModal(false)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full hover:bg-slate-200"><X size={20}/></button>
            <h2 className="text-2xl font-black text-purple-600 mb-6 flex items-center gap-2"><FlaskConical/> Book Lab Test</h2>
            <form onSubmit={handleLabBooking} className="space-y-4">
              <input required placeholder="Patient Name" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500" onChange={e => setLabForm({...labForm, patientName: e.target.value})} />
              <input required placeholder="Mobile Number" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500" onChange={e => setLabForm({...labForm, mobile: e.target.value})} />
              <select className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500" onChange={e => setLabForm({...labForm, testType: e.target.value})}>
                <option>Blood Test (CBC)</option><option>X-Ray</option><option>MRI Scan</option><option>Sugar Test</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500" onChange={e => setLabForm({...labForm, date: e.target.value})} />
                <input required type="time" className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500" onChange={e => setLabForm({...labForm, time: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white font-black py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200">Request Test</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;