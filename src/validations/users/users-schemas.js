import Joi from "joi";

import {
	roleSchema,
	paginationSchema,
	nameUserSchema,
	passwordSchema,
	nameUsers,
	emailSchema,
} from "../schemas/sub-schemas.js";

export const schemaListUsersValidations = Joi.object({
	role: roleSchema.optional(),
	page: paginationSchema.extract("page"),
	limit: paginationSchema.extract("limit"),
});

export const schemaCreateUserValidations = Joi.object({
	username: nameUserSchema,
	password: passwordSchema,
	full_name: nameUsers,
	email: emailSchema,
	role: roleSchema,
});

export const schemaSearchUserValidations = Joi.object({
	email: Joi.string().lowercase().trim().min(1).max(255).required().messages({
		"string.base": "El email debe ser un texto",
		"string.empty": "El email no puede estar vacío",
		"string.min": "El email debe tener al menos 3 caracteres",
		"string.max": "El email no puede superar los 255 caracteres",
		"any.required": "El email es obligatorio",
	}),
});

export const schemaUpdateUserValidations = Joi.object({
	username: nameUserSchema.optional(),
	password: passwordSchema.optional(),
	full_name: nameUsers.optional(),
	email: emailSchema.optional(),
	role: roleSchema.optional(),
});
