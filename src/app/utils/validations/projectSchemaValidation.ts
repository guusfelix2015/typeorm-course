import Joi from "joi";

const projectSchemaValidation = Joi.object({
  name: Joi.string().required().min(3).max(100).messages({
    "string.base": "O campo nome deve ser uma string",
    "string.empty": "O campo nome não pode estar vazio",
    "string.min": "O campo nome deve ter pelo menos {#limit} caracteres",
    "string.max": "O campo nome não pode ter mais de {#limit} caracteres",
    "any.required": "O campo nome é obrigatório",
  }),
  description: Joi.string().required().min(3).max(255).messages({
    "string.base": "O campo descrição deve ser uma string",
    "string.empty": "O campo descrição não pode estar vazio",
    "string.min": "O campo descrição deve ter pelo menos {#limit} caracteres",
    "string.max": "O campo descrição não pode ter mais de {#limit} caracteres",
    "any.required": "O campo descrição é obrigatório",
  }),
  start_at: Joi.date().required().messages({
    "date.base": "O campo data de início deve ser uma data",
    "any.required": "O campo data de início é obrigatório",
  }),
  end_at: Joi.date().required().messages({
    "date.base": "O campo data de término deve ser uma data",
    "any.required": "O campo data de término é obrigatório",
  }),
  active: Joi.boolean().optional().messages({
    "boolean.base": "O campo ativo deve ser um valor booleano",
  }),
});

export default projectSchemaValidation;
