import React, { useState, useEffect } from 'react';
import API from '../api';
import { Plus, Trash2, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', specialty: '', status: 'Available' });

  const fetchDoctors = async () => {
    try {
      const { data } = await API.get('/doctors');
      setDoctors(data);
    } catch (error) {
      alert('Failed to load doctors');
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/doctors/add', form);
      setShowForm(false);
      fetchDoctors();
      setForm({ name: '', specialty: '', status: 'Available' });
    } catch (error) { alert('Error adding doctor'); }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/doctors/${id}/status`, { status: newStatus });
      fetchDoctors();
    } catch (error) { alert('Error updating status'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this doctor?')) {
      await API.delete(`/doctors/${id}`);
      fetchDoctors();
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Available') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'In Surgery') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-full hover:bg-gray-200">
            <ArrowLeft />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Doctor Status</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg transition">
          <Plus size={20} /> Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-blue-600">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required placeholder="Dr. Name" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, name: e.target.value})} />
            <input required placeholder="Specialty" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, specialty: e.target.value})} />
            <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Save Doctor</button>
          </form>
        </div>
      )}

      {/* RESPONSIVE GRID RULE APPLIED HERE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.specialty}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(doc._id)} className="text-gray-400 hover:text-red-500 transition"><Trash2 size={18}/></button>
            </div>
            
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {['Available', 'In Surgery', 'Off Duty'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(doc._id, status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${doc.status === status ? getStatusColor(status) : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'}`}
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