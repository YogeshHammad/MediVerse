import React, { useState, useEffect } from 'react';
import API from '../api';
import { Calendar, Check, X, Clock, User, ArrowLeft, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  
  // Fetch All Appointments
  const fetchAppointments = async () => {
    try {
      const { data } = await API.get('/appointments');
      setAppointments(data);
    } catch (error) {
      alert('Failed to load appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ✅ Function: Confirm Appointment
  const handleConfirm = async (id) => {
    try {
      await API.put(`/appointments/${id}`, { status: 'Confirmed' });
      alert('Appointment Confirmed! ✅');
      fetchAppointments();
    } catch (error) {
      alert('Error confirming appointment');
    }
  };

  // ✏️ Function: Reschedule (Change Time)
  const handleReschedule = async (id) => {
    const newDate = prompt("Enter new YYYY-MM-DD:");
    const newTime = prompt("Enter new Time (e.g., 10:00 AM):");
    
    if (newDate && newTime) {
      try {
        await API.put(`/appointments/${id}`, { 
          date: newDate, 
          time: newTime, 
          status: 'Confirmed' // Auto confirm after reschedule
        });
        alert('Appointment Rescheduled & Confirmed! 🗓️');
        fetchAppointments();
      } catch (error) {
        alert('Error updating appointment');
      }
    }
  };

  // ❌ Function: Cancel/Reject
  const handleDelete = async (id) => {
    if (window.confirm('Reject this appointment?')) {
      try {
        await API.delete(`/appointments/${id}`);
        fetchAppointments();
      } catch (error) {
        alert('Error deleting appointment');
      }
    }
  };

  // Separate Lists
  const pendingList = appointments.filter(a => a.status === 'Pending');
  const confirmedList = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Scheduled');

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-full hover:bg-gray-200">
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Appointment Manager</h1>
      </div>

      {/* 🔔 SECTION 1: NEW REQUESTS (PENDING) */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
           🔔 New Requests ({pendingList.length})
        </h2>
        
        {pendingList.length === 0 ? (
          <p className="text-gray-400 italic">No new requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingList.map((apt) => (
              <div key={apt._id} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-400 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <User size={18} className="text-orange-500"/> {apt.patientName}
                  </h3>
                  <p className="text-sm text-gray-500">Dr. {apt.doctorName}</p>
                  <div className="flex gap-3 mt-2 text-sm font-medium text-gray-600">
                     <span className="bg-orange-100 px-2 py-1 rounded">Requested: {new Date(apt.date).toLocaleDateString()} @ {apt.time}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                   <button onClick={() => handleConfirm(apt._id)} title="Confirm" className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                     <Check size={20} />
                   </button>
                   <button onClick={() => handleReschedule(apt._id)} title="Reschedule" className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                     <Edit2 size={20} />
                   </button>
                   <button onClick={() => handleDelete(apt._id)} title="Reject" className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                     <X size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ SECTION 2: CONFIRMED APPOINTMENTS */}
      <div>
        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
           ✅ Upcoming Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {confirmedList.map((apt) => (
            <div key={apt._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 opacity-90">
              <h3 className="font-bold text-lg">{apt.patientName}</h3>
              <p className="text-green-600 text-sm font-bold">Dr. {apt.doctorName}</p>
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <Calendar size={14}/> {new Date(apt.date).toLocaleDateString()} 
                <Clock size={14}/> {apt.time}
              </div>
              <button onClick={() => handleDelete(apt._id)} className="mt-3 text-xs text-red-400 hover:text-red-600 underline">Cancel Appt</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Appointments;