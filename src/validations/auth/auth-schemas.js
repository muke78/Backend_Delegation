import Joi from "joi";
import { emailSchema, passwordSchema } from "../schemas/sub-schemas.js";

export const schemaAuthUserValidations = Joi.object({
	email: emailSchema,
	password: passwordSchema,
});
