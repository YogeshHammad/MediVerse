import React, { useState, useEffect } from 'react';
import API from '../api';
import { Plus, Trash2, Activity, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', specialty: '', mobile: '', status: 'Available' });

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await API.get('/doctors');
      setDoctors(data);
    } catch (error) {
      alert('Failed to load doctors');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add Doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/doctors/add', form);
      alert('Doctor Added!');
      setShowForm(false);
      fetchDoctors();
      setForm({ name: '', specialty: '', mobile: '', status: 'Available' });
    } catch (error) {
      alert('Error adding doctor');
    }
  };

  // Update Status (The cool toggle feature)
  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/doctors/${id}/status`, { status: newStatus });
      fetchDoctors();
    } catch (error) {
      alert('Error updating status');
    }
  };

  // Delete Doctor
  const handleDelete = async (id) => {
    if (window.confirm('Delete this doctor?')) {
      await API.delete(`/doctors/${id}`);
      fetchDoctors();
    }
  };

  // Helper for Status Color
  const getStatusColor = (status) => {
    if (status === 'Available') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'In Surgery') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-full hover:bg-gray-200">
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Doctor Status</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-lg">
          <Plus size={20} /> Add Doctor
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-primary animate-fade-in">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required placeholder="Dr. Name" className="p-3 border rounded" onChange={e => setForm({...form, name: e.target.value})} />
            <input required placeholder="Specialty (e.g. Heart)" className="p-3 border rounded" onChange={e => setForm({...form, specialty: e.target.value})} />
            <button type="submit" className="bg-primary text-white py-3 rounded font-bold hover:bg-blue-800">Save Doctor</button>
          </form>
        </div>
      )}

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.specialty}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(doc._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18}/></button>
            </div>
            
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Current Status</p>
              <div className="flex gap-2">
                {['Available', 'In Surgery', 'Off Duty'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(doc._id, status)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${doc.status === status ? getStatusColor(status) : 'bg-white border-gray-200 text-gray-400'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;