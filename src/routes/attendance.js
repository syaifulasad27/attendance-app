const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const attendanceController = require('../controllers/attendanceController');
const validate = require('../middlewares/validate');
const { attendanceSchema } = require('../schemas/attendanceSchema');

const router = express.Router();

router.post('/create', validate(attendanceSchema), authMiddleware, attendanceController.createAttendance);

router.get('/list', authMiddleware, attendanceController.getAttendance);

router.put('/update/:id', authMiddleware, attendanceController.updateAttendance);

module.exports = router;