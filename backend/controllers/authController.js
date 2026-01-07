const User = require('../models/user');

// REGISTER: Saves data to MongoDB
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Save to database
    user = new User({ name, email, password, role: 'patient' });
    await user.save(); 

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// LOGIN: Matches credentials and returns the "user" object
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // This structure fixes the "Oops" error
    res.json({ 
      token: "valid_session_" + user._id, 
      user: { 
        _id: user._id, 
        name: user.name, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};