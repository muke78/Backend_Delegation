import Joi from "joi";
import {
	alphaNumericSchema,
	paginationSchema,
	uuidSchema,
	yearNumberSchema,
} from "../schemas/sub-schemas.js";

export const schemaFolioValidations = Joi.object({
	folio: Joi.string()
		.trim()
		.pattern(/^[A-Za-z0-9]+$/, "solo letras y números")
		.min(3)
		.max(50)
		.required()
		.messages({
			"string.empty": "El folio no puede estar vacío",
			"string.pattern.name": "El folio solo puede contener letras y números",
			"string.min": "El folio es demasiado corto",
			"string.max": "El folio es demasiado largo",
			"any.required": "El folio es obligatorio",
		}),
});

export const schemaListArchivesValidations = Joi.object({
	identifier: alphaNumericSchema.optional(),
	base_folio: alphaNumericSchema.optional(),
	name: alphaNumericSchema.optional(),
	doc_type: alphaNumericSchema.optional(),
	year: yearNumberSchema.optional(),
	created_by: uuidSchema.optional(),
	page: paginationSchema.extract("page"),
	limit: paginationSchema.extract("limit"),
});

export const schemaCreateArchivesValidations = Joi.object({
	identifier: alphaNumericSchema,
	base_folio: alphaNumericSchema,
	name: alphaNumericSchema,
	doc_type: alphaNumericSchema.optional(),
	year: yearNumberSchema.optional(),
	storage_path: alphaNumericSchema.optional().empty(""),
	source_sheet: alphaNumericSchema.optional().empty(""),
	created_by: uuidSchema,
});

export const schemaUpdateArchiveValidations = Joi.object({
	identifier: alphaNumericSchema.optional(),
	base_folio: alphaNumericSchema.optional(),
	name: alphaNumericSchema.optional(),
	doc_type: alphaNumericSchema.optional(),
	year: yearNumberSchema.optional(),
	storage_path: alphaNumericSchema.optional().empty(""),
	source_sheet: alphaNumericSchema.optional().empty(""),
	created_by: uuidSchema.optional(),
});
