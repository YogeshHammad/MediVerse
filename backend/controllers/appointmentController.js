exports.getAppointments = async (req, res) => {
  try {
    const { userId, role } = req.query; 
    
    let appointments;
    if (role === 'admin') {
      // Admin sees everything
      appointments = await Appointment.find().sort({ date: -1 });
    } else {
      // Patient only sees their appointments where patientId matches
      // Use the 'patientId' or 'mobile' to filter
      appointments = await Appointment.find({ patientId: userId }).sort({ date: -1 });
    }
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};