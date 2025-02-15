const Joi = require('joi');

const attendanceSchema = Joi.object({
    photoUrl: Joi.string().uri().required(),
    // status: Joi.string().valid('pending', 'reviewed').required(),
});

module.exports = { attendanceSchema };