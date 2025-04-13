import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret_key_shree';


export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        password:user. password 
      }
    });

  } catch (err) {
    res.status(500).json({
      msg: 'Error while logging in',
      error: err.message
    });
  }
};

