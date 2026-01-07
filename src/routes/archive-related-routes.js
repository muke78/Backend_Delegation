import express from "express";
import { verifyToken } from "../middlewares/verify-jwt-middlewares.js";
import { methodCreated, methodOK } from "../server/methods-server.js";
import {
	DeleteRelated,
	GetRelatedSpecify,
	InsertRelated,
	UpdateRelated,
} from "../controllers/index.js";
import { validationFields } from "../middlewares/validation-middlewares.js";
import {
	multiUuidSchema,
	schemaCreateRelatedValidations,
	schemaUpdateRelatedValidations,
} from "../validations/index.js";

const archiveRelated = express.Router({ mergeParams: true });

//  GET api/archives/:archiveId/related/:relationId (list_reference_exact)
archiveRelated.get(
	"/:relationId",
	verifyToken,
	validationFields(multiUuidSchema(["archiveId", "relationId"]), "params"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const relationId = request.params.relationId;

			const result = await GetRelatedSpecify(archiveId, relationId);
			methodOK(request, response, result);
		} catch (error) {
			next(error);
		}
	},
);

// POST api/archives/:archiveId/related
archiveRelated.post(
	"/",
	verifyToken,
	validationFields(multiUuidSchema(["archiveId"]), "params"),
	validationFields(schemaCreateRelatedValidations, "body"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const insertRelated = request.body;

			const result = await InsertRelated(insertRelated, archiveId);
			methodCreated(
				request,
				response,
				result,
				"Se creo correctamente la referencia",
			);
		} catch (error) {
			next(error);
		}
	},
);

// PUT api/archives/:archiveId/related/:relationId
archiveRelated.put(
	"/:relationId",
	verifyToken,
	validationFields(multiUuidSchema(["relationId", "archiveId"]), "params"),
	validationFields(schemaUpdateRelatedValidations, "body"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const relationId = request.params.relationId;
			const relatedData = request.body;

			const result = await UpdateRelated(relationId, archiveId, relatedData);
			methodOK(
				request,
				response,
				result,
				"La referencia se actualizo de forma correcta",
			);
		} catch (error) {
			next(error);
		}
	},
);

// DELETE api/archives/:archiveId/related/:relationId
archiveRelated.delete(
	"/:relationId",
	verifyToken,
	validationFields(multiUuidSchema(["relationId", "archiveId"]), "params"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const relationId = request.params.relationId;
			const result = await DeleteRelated(relationId, archiveId);
			methodOK(
				request,
				response,
				undefined,
				`La referencia ${result.description} fue eliminado correctamente`,
			);
		} catch (error) {
			next(error);
		}
	},
);

export { archiveRelated };
