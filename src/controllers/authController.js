const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah digunakan' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ message: 'Registrasi berhasil', token, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ message: 'Login berhasil', token, user });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};