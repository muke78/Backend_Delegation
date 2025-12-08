import express from "express";
import { verifyToken } from "../middlewares/verify-jwt-middlewares.js";
import { methodCreated, methodOK } from "../server/methods-server.js";
import {
	DeleteRelated,
	GetRelatedSpecify,
	GetRelatedWithArchives,
	InsertRelated,
	UpdateRelated,
} from "../controllers/index.js";

const related = express.Router({ mergeParams: true });

//  GET api/archives/:archiveId/related/:relationId
related.get("/:relationId", verifyToken, async (request, response, next) => {
	try {
		const archiveId = request.params.archiveId;
		const relationId = request.params.relationId;

		const result = await GetRelatedSpecify(archiveId, relationId);
		methodOK(request, response, result);
	} catch (error) {
		next(error);
	}
});

// GET api/archives/:archiveId/related
related.get("/", verifyToken, async (request, response, next) => {
	try {
		const archiveId = request.params.archiveId;
		const listRelated = request.query;

		const result = await GetRelatedWithArchives(archiveId, listRelated);
		methodOK(request, response, result);
	} catch (error) {
		next(error);
	}
});

// POST api/archives/:archiveId/related
related.post("/", verifyToken, async (request, response, next) => {
	try {
		const insertRelated = request.body;
		const archiveId = request.params.archiveId;

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
});

// PUT api/archives/:archiveId/related/:relationId
related.put("/:relationId", verifyToken, async (request, response, next) => {
	try {
		const relationId = request.params.relationId;
		const relatedData = request.body;

		const result = await UpdateRelated(relationId, relatedData);
		methodOK(
			request,
			response,
			result,
			"La referencia se actualizo de forma correcta",
		);
	} catch (error) {
		next(error);
	}
});

// DELETE api/archives/:archiveId/related/:relationId
related.delete("/:relationId", verifyToken, async (request, response, next) => {
	try {
		const relationId = request.params.relationId;
		const result = await DeleteRelated(relationId);
		methodOK(
			request,
			response,
			undefined,
			`La referencia ${result.description} fue eliminado correctamente`,
		);
	} catch (error) {
		next(error);
	}
});

export { related };
