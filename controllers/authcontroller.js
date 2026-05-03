const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }
    const result = await registerUser(name, email, password);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const result = await loginUser(email, password);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

module.exports = { register, login, logout, getMe }; 