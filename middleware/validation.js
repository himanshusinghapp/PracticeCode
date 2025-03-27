const Joi = require('@hapi/joi');

// Define schema for user validation
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required()
});

module.exports = { userSchema }