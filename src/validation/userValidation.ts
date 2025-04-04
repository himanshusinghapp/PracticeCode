import Joi from "joi";

export const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
});
