import Joi from "joi";

const addressSchemaValidation = Joi.object({
  id: Joi.number().optional(),
  street: Joi.string().required().min(3).max(100).messages({
    "string.base": "The street field must be a string",
    "string.empty": "The street field cannot be empty",
    "string.min": "The street field must have at least {#limit} characters",
    "string.max": "The street field cannot have more than {#limit} characters",
    "any.required": "The street field is required",
  }),
  city: Joi.string().required().min(3).max(100).messages({
    "string.base": "The city field must be a string",
    "string.empty": "The city field cannot be empty",
    "string.min": "The city field must have at least {#limit} characters",
    "string.max": "The city field cannot have more than {#limit} characters",
    "any.required": "The city field is required",
  }),
  state: Joi.string().required().min(2).max(2).messages({
    "string.base": "The state field must be a string",
    "string.empty": "The state field cannot be empty",
    "string.min": "The state field must have at least {#limit} characters",
    "string.max": "The state field cannot have more than {#limit} characters",
    "any.required": "The state field is required",
  }),
  user_id: Joi.number().required().messages({
    "number.base": "The id_user field must be a number",
    "number.empty": "The id_user field cannot be empty",
  }),
});

export default addressSchemaValidation;
