const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ada' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    } else {
        return res.status(401).json({ message: 'Format token salah' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
};
