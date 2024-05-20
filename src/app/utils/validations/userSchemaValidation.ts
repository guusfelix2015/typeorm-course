import Joi from "joi";

export const userSchemaValidation = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required().min(3).max(100).messages({
    "string.base": "O campo nome deve ser uma string",
    "string.empty": "O campo nome não pode estar vazio",
    "string.min": "O campo nome deve ter pelo menos {#limit} caracteres",
    "string.max": "O campo nome não pode ter mais de {#limit} caracteres",
    "any.required": "O campo nome é obrigatório",
  }),
  email: Joi.string().email().required().min(10).max(100).messages({
    "string.email": "O campo email deve ser um email válido",
    "string.empty": "O campo email não pode estar vazio",
    "string.min": "O campo email deve ter pelo menos {#limit} caracteres",
    "string.max": "O campo email não pode ter mais de {#limit} caracteres",
    "any.required": "O campo email é obrigatório",
  }),
  password: Joi.string().required().max(100).messages({
    "string.empty": "O campo senha não pode estar vazio",
    "string.max": "O campo senha não pode ter mais de {#limit} caracteres",
    "any.required": "O campo senha é obrigatório",
  }),
  birth_date: Joi.date().required().messages({
    "date.base": "O campo data de nascimento deve ser uma data",
    "any.required": "O campo data de nascimento é obrigatório",
  }),
  active: Joi.boolean().optional().messages({
    "boolean.base": "O campo ativo deve ser um valor booleano",
  }),
});
