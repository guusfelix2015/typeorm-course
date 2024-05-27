import Joi from "joi";

const userProjectSchemaValidation = Joi.object({
  user_id: Joi.number().required().messages({
    "number.base": "O campo id_user deve ser um número",
    "number.empty": "O campo id_user não pode estar vazio",
    "any.required": "O campo id_user é obrigatório",
  }),
  project_id: Joi.number().required().messages({
    "number.base": "O campo id_project deve ser um número",
    "number.empty": "O campo id_project não pode estar vazio",
    "any.required": "O campo id_project é obrigatório",
  }),
  hours_worked: Joi.number().required().min(0).messages({
    "number.base": "O campo horas trabalhadas deve ser um número",
    "number.empty": "O campo horas trabalhadas não pode estar vazio",
    "number.min": "O campo horas trabalhadas não pode ser menor que {#limit}",
    "any.required": "O campo horas trabalhadas é obrigatório",
  }),
});

export default userProjectSchemaValidation;
