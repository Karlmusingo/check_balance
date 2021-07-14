import Joi = require('joi');

export const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const loginSchema = Joi.object({
  username: [Joi.string().email(), Joi.string().alphanum().min(3).max(30)],
  password: Joi.string().min(5).required(),
});
