import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, CreditCard, CheckCircle, ArrowRight, Activity, ChevronLeft } from 'lucide-react';
import API from '../api';

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", disease: "Heart Issues", fee: 500, time: "10:00 AM - 11:30 AM" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Neurology", disease: "Brain & Nerves", fee: 800, time: "01:00 PM - 02:30 PM" },
  { id: 3, name: "Dr. Priya Sharma", specialty: "Dermatology", disease: "Skin & Hair", fee: 400, time: "04:00 PM - 05:30 PM" },
];

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDr, setSelectedDr] = useState(null);
  const [date, setDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const confirmBooking = async () => {
    setIsBooking(true);
    try {
      const patientId = localStorage.getItem('patientId');
      const patientName = localStorage.getItem('userName');
      
      await API.post('/appointments/book', {
        patientId,
        patientName,
        doctorName: selectedDr.name,
        date: date,
        time: selectedDr.time,
        status: "Confirmed"
      });
      setStep(3); // Show Success
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (err) { alert("Booking Error"); }
    finally { setIsBooking(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <button onClick={() => navigate('/dashboard')} className="self-start mb-8 flex items-center gap-2 font-black text-slate-500 hover:text-blue-600 transition-all">
        <ChevronLeft /> Back to Dashboard
      </button>

      <div className="max-w-3xl w-full bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-10 text-white flex justify-between items-center">
          <div><h2 className="text-2xl font-black">Book Appointment</h2><p className="opacity-70 font-bold">Step {step} of 3</p></div>
          <Activity size={32} />
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800">Select Doctor & Disease</h3>
              {doctors.map(dr => (
                <div key={dr.id} onClick={() => { setSelectedDr(dr); setStep(2); }} className="p-6 border-2 border-slate-100 rounded-3xl hover:border-blue-600 cursor-pointer transition-all flex justify-between items-center group">
                  <div className="flex gap-4 items-center">
                    <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><User /></div>
                    <div>
                      <h4 className="font-black text-lg text-slate-800">{dr.name}</h4>
                      <p className="text-blue-600 font-bold text-sm uppercase">{dr.disease}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-black text-xl">₹{dr.fee}</p>
                    <p className="text-xs font-bold text-slate-400">Consultation Fee</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-bottom-5">
              <div className="bg-slate-50 p-6 rounded-3xl border flex items-center gap-4">
                <Clock className="text-blue-600" />
                <div><p className="font-black">Time Slot: {selectedDr.time}</p><p className="text-slate-500 font-bold italic">Doctor: {selectedDr.name}</p></div>
              </div>
              <input type="date" className="w-full p-5 bg-slate-100 rounded-2xl font-black outline-none border-2 border-transparent focus:border-blue-600" onChange={e => setDate(e.target.value)} />
              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-200 flex justify-between">
                <span className="font-black text-slate-600 flex gap-2 items-center"><CreditCard size={18}/> Payment Detail</span>
                <span className="font-black text-2xl text-blue-600">₹{selectedDr.fee}</span>
              </div>
              <button disabled={!date || isBooking} onClick={confirmBooking} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 active:scale-95">
                {isBooking ? "Booking..." : "Confirm & Book Slot"} <ArrowRight />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="py-16 text-center animate-in zoom-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} strokeWidth={3}/></div>
              <h3 className="text-3xl font-black text-slate-800">Slot Confirmed!</h3>
              <p className="text-slate-500 font-bold mt-2">Check your dashboard for details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookAppointment;