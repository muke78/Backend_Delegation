import Joi from "joi";
import {
	emailSchema,
	nameUserSchema,
	passwordSchema,
} from "../schemas/subSchemas.schemas.js";

export const schemaRegisterUserValidations = Joi.object({
	name_user: nameUserSchema,
	email: emailSchema,
	password: passwordSchema,
});
