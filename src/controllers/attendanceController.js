const Attendance = require('../models/Attendance');
const { Types } = require('mongoose');
const { ObjectId } = Types;

exports.createAttendance = async (req, res) => {
    try {
        const { photoUrl } = req.body;

        const attendance = await Attendance.create({
            userId: req.user.id,
            photoUrl: photoUrl,
            status: 'pending'
        });
        res.status(201).json({ message: 'Attendance created successfully', attendance });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const userId = new ObjectId(req.user.id);
        const attendances = await Attendance.aggregate([
            { $match: { userId: userId } },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { 'user.password': 0 } }
        ]);
        res.json(attendances);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const attendance = await Attendance.findOne({ _id: id, userId: req.user.id });
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance not found' });
        }

        attendance.status = status;
        await attendance.save();

        res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong' });
    }
};