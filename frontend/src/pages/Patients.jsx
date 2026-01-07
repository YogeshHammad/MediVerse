import React, { useState, useEffect } from 'react';
import API from '../api';
import { Search, Plus, User, Trash2, ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import PDF Library

const Patients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [form, setForm] = useState({
    name: '', age: '', gender: 'Male', mobile: '', disease: '', doctor: '', department: ''
  });

  const fetchPatients = async () => {
    try {
      const { data } = await API.get('/patients');
      setPatients(data);
    } catch (error) {
      alert('Failed to load patients');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/patients/add', form);
      alert('Patient Added!');
      setShowForm(false);
      fetchPatients();
      setForm({ name: '', age: '', gender: 'Male', mobile: '', disease: '', doctor: '', department: '' });
    } catch (error) {
      alert('Error adding patient');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this patient?')) {
      await API.delete(`/patients/${id}`);
      fetchPatients();
    }
  };

  // 🖨️ FUNCTION TO GENERATE PDF SLIP
  const generateSlip = (patient) => {
    const doc = new jsPDF();

    // Header (Hospital Name)
    doc.setFontSize(22);
    doc.setTextColor(40, 116, 240); // Blue Color
    doc.text("MediVerse Hospital", 105, 20, null, null, "center");
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Indore, Madhya Pradesh | Phone: +91-9876543210", 105, 30, null, null, "center");
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35); // Horizontal Line

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text("OPD / ADMISSION SLIP", 105, 50, null, null, "center");

    // Patient Details Box
    doc.setFontSize(14);
    doc.text(`Patient Name:  ${patient.name}`, 20, 70);
    doc.text(`Age / Gender:  ${patient.age} / ${patient.gender}`, 20, 80);
    doc.text(`Contact No:    ${patient.mobile}`, 20, 90);
    
    doc.text(`Disease:       ${patient.disease}`, 20, 110);
    doc.text(`Department:    ${patient.department}`, 20, 120);
    doc.text(`Assigned Dr:   ${patient.doctor}`, 20, 130);

    // Footer
    doc.setFontSize(10);
    doc.text("This is a computer-generated slip.", 20, 160);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 160);

    // Save File
    doc.save(`${patient.name}_Slip.pdf`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-full hover:bg-gray-200">
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-lg"
        >
          <Plus size={20} /> Add Patient
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 animate-fade-in">
          <h3 className="text-xl font-bold mb-4 text-primary">New Patient Details</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Patient Name" className="p-3 border rounded" onChange={e => setForm({...form, name: e.target.value})} />
            <div className="flex gap-2">
              <input required type="number" placeholder="Age" className="p-3 border rounded w-1/2" onChange={e => setForm({...form, age: e.target.value})} />
              <select className="p-3 border rounded w-1/2" onChange={e => setForm({...form, gender: e.target.value})}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <input required placeholder="Mobile Number" className="p-3 border rounded" onChange={e => setForm({...form, mobile: e.target.value})} />
            <input required placeholder="Disease" className="p-3 border rounded" onChange={e => setForm({...form, disease: e.target.value})} />
            <input required placeholder="Assigned Doctor" className="p-3 border rounded" onChange={e => setForm({...form, doctor: e.target.value})} />
            <input required placeholder="Department" className="p-3 border rounded" onChange={e => setForm({...form, department: e.target.value})} />
            <button type="submit" className="col-span-1 md:col-span-2 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">Save Patient Record</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-50 border-b">
            <tr>
              <th className="p-4 text-gray-600 font-medium">Name</th>
              <th className="p-4 text-gray-600 font-medium">Age/Gender</th>
              <th className="p-4 text-gray-600 font-medium">Disease</th>
              <th className="p-4 text-gray-600 font-medium">Doctor</th>
              <th className="p-4 text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><User size={16} /></div>
                  {patient.name}
                </td>
                <td className="p-4 text-gray-600">{patient.age} / {patient.gender}</td>
                <td className="p-4 text-gray-600">{patient.disease}</td>
                <td className="p-4 text-gray-600">{patient.doctor}</td>
                <td className="p-4 flex gap-2">
                  {/* Download Button */}
                  <button 
                    onClick={() => generateSlip(patient)} 
                    title="Download Slip"
                    className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded"
                  >
                    <FileText size={18} />
                  </button>
                  
                  {/* Delete Button */}
                  <button onClick={() => handleDelete(patient._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;