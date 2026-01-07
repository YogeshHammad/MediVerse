import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FlaskConical, X, UploadCloud } from 'lucide-react';

const LabTests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  
  const fetchTests = async () => {
    try {
      const { data } = await API.get('/tests');
      setTests(data);
    } catch (error) { alert('Failed to load tests'); }
  };

  useEffect(() => { fetchTests(); }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/tests/${id}`, { status });
    fetchTests();
  };

  // 📤 FILE UPLOAD FUNCTION
  const handleFileUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('reportFile', file);

    try {
      // Note: We use 'post' for file upload route we created
      await API.post(`/tests/${id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('📄 PDF Report Uploaded Successfully!');
      fetchTests();
    } catch (error) {
      alert('Error uploading file');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-full"><ArrowLeft /></button>
        <h1 className="text-3xl font-bold text-gray-800">Lab & Pathology Requests</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test._id} className={`bg-white p-6 rounded-xl shadow-md border-l-4 
            ${test.status === 'Report Ready' ? 'border-green-500' : test.status === 'Pending' ? 'border-orange-500' : 'border-blue-500'}`}>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{test.patientName}</h3>
                <p className="text-gray-500 text-sm">{test.mobile}</p>
              </div>
              <FlaskConical className="text-purple-500" />
            </div>
            <p className="font-bold text-purple-700 mb-2">{test.testType}</p>
            <p className="text-sm font-bold mb-3">Status: <span className="text-primary">{test.status}</span></p>

            <div className="flex gap-2 items-center">
              {test.status === 'Pending' && (
                <>
                  <button onClick={() => updateStatus(test._id, 'Confirmed')} className="flex-1 bg-green-100 text-green-700 py-2 rounded font-bold hover:bg-green-200">Confirm</button>
                  <button onClick={() => updateStatus(test._id, 'Rejected')} className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200"><X size={20}/></button>
                </>
              )}
              
              {test.status === 'Confirmed' && (
                <div className="w-full">
                  {/* HIDDEN FILE INPUT TRICK */}
                  <label className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-blue-700">
                    <UploadCloud size={18} /> Upload PDF
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, test._id)} 
                    />
                  </label>
                </div>
              )}

              {test.status === 'Report Ready' && (
                <div className="w-full bg-green-50 text-green-700 p-2 text-center text-sm border border-green-200 rounded">
                  ✅ PDF Sent
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTests;