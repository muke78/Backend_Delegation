import Joi from "joi";

import {
	alphaNumericSchema,
	yearSchema,
	paginationSchema,
} from "../schemas/sub-schemas.js";

export const schemaListRelatedValidations = Joi.object({
	description: alphaNumericSchema.optional().empty(""),
	event_date: yearSchema.optional().empty(""),
	responsible_person: alphaNumericSchema.optional().empty(""),
	page: paginationSchema.extract("page"),
	limit: paginationSchema.extract("limit"),
});

export const schemaCreateRelatedValidations = Joi.object({
	description: alphaNumericSchema,
	event_date: yearSchema,
	responsible_person: alphaNumericSchema.optional().empty(""),
	responsible_role: alphaNumericSchema.optional().empty(""),
	notas: alphaNumericSchema.optional().empty(""),
});

export const schemaUpdateRelatedValidations = Joi.object({
	description: alphaNumericSchema.optional().empty(""),
	event_date: yearSchema.optional().empty(""),
	responsible_person: alphaNumericSchema.optional().empty(""),
	responsible_role: alphaNumericSchema.optional().empty(""),
	notas: alphaNumericSchema.optional().empty(""),
});
