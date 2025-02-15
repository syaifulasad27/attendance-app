const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' },
    photoUrl: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);