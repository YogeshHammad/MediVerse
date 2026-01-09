const User = require('../models/user');

// Register a new Patient
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    user = new User({ name, email, password, role: 'patient' });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Simple validation
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Send user info back
    res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};