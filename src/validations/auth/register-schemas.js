import Joi from "joi";
import {
	emailSchema,
	nameUsers,
	nameUserSchema,
	passwordSchema,
	roleSchema,
} from "../schemas/sub-schemas.js";

export const schemaRegisterUserValidations = Joi.object({
	username: nameUserSchema,
	password: passwordSchema,
	full_name: nameUsers,
	email: emailSchema,
	role: roleSchema,
});
