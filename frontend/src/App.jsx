import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WelcomePage from './pages/WelcomePage'; // 👈 IMPORT NEW PAGE
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Inventory from './pages/Inventory';
import LabTests from './pages/LabTests';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Sabse pehle Partner ka page dikhega */}
        <Route path="/" element={<WelcomePage />} />

        {/* 2. Button dabane par Tumhara page dikhega */}
        <Route path="/home" element={<LandingPage />} /> 

        {/* Baaki sab same rahega */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/lab-tests" element={<LabTests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;