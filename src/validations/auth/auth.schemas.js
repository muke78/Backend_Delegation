import Joi from "joi";
import { emailSchema, passwordSchema } from "../schemas/subSchemas.schemas.js";

export const schemaAuthUserValidations = Joi.object({
	email: emailSchema,
	password: passwordSchema,
});
