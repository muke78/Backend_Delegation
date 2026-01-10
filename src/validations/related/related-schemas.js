import Joi from "joi";

import {
	alphaNumericSchema,
	yearSchema,
	paginationSchema,
	uuidSchema,
} from "../schemas/sub-schemas.js";

export const schemaListRelatedValidations = Joi.object({
	reference_folio: alphaNumericSchema().optional().empty(""),
	description: alphaNumericSchema().optional().empty(""),
	event_date: yearSchema.optional().empty(""),
	responsible_person: alphaNumericSchema().optional().empty(""),
	page: paginationSchema.extract("page"),
	limit: paginationSchema.extract("limit"),
});

export const schemaCreateRelatedValidations = Joi.object({
	archive_id: uuidSchema,
	description: alphaNumericSchema(),
	event_date: yearSchema.optional().empty("").default(null),
	responsible_person: alphaNumericSchema(),
	responsible_role: alphaNumericSchema().optional().empty(""),
	notas: alphaNumericSchema(400).optional().empty(""),
});

export const schemaUpdateRelatedValidations = Joi.object({
	description: alphaNumericSchema().optional().empty(""),
	event_date: yearSchema.optional().empty("").default(null),
	responsible_person: alphaNumericSchema().optional().empty(""),
	responsible_role: alphaNumericSchema().optional().empty(""),
	notas: alphaNumericSchema(400).optional().empty(""),
});
