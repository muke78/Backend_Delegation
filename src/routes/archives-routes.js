import express from "express";
import { verifyToken } from "../middlewares/verify-jwt-middlewares.js";
import { methodOK, methodCreated } from "../server/methods-server.js";
import {
	DeleteArchive,
	GetAllArchives,
	GetDuplexArchiveAndRelated,
	GetOnlyArchive,
	InsertArchives,
	RegenerateFolio,
	SearchOfArchives,
	UpdateArchive,
	ValidateFolio,
} from "../controllers/index.js";
import { validationFields } from "../middlewares/validation-middlewares.js";
import {
	multiUuidSchema,
	schemaCreateArchivesValidations,
	schemaFolioValidations,
	schemaListArchivesValidations,
	schemaUpdateArchiveValidations,
} from "../validations/index.js";

const archives = express.Router();

// GET /api/archive/full_duplex_archives_and_related
archives.get(
	"/:archiveId/duplex",
	verifyToken,
	validationFields(multiUuidSchema(["archiveId"]), "params"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const result = await GetDuplexArchiveAndRelated(archiveId);
			methodOK(request, response, result);
		} catch (error) {
			next(error);
		}
	},
);

// GET /api/archive/search
archives.get(
	"/search",
	verifyToken,
	validationFields(schemaFolioValidations, "query"),
	async (request, response, next) => {
		try {
			const { folio } = request.query;
			const result = await SearchOfArchives(folio);
			methodOK(request, response, result, "Busqueda realizada correctamente");
		} catch (error) {
			next(error);
		}
	},
);

// GET /api/archive/validate-folio
archives.get(
	"/validate-folio",
	verifyToken,
	validationFields(schemaFolioValidations, "query"),
	async (req, res, next) => {
		try {
			const { folio } = req.query;
			const result = await ValidateFolio(folio);
			methodOK(req, res, result);
		} catch (error) {
			next(error);
		}
	},
);

//PUT /api/archives/regenerate-folio/:id
archives.put(
	"/:archiveId/regenerate-folio",
	verifyToken,
	validationFields(multiUuidSchema(["archiveId"]), "params"),
	async (req, res, next) => {
		try {
			const archiveId = req.params.archiveId;
			const result = await RegenerateFolio(archiveId);
			methodOK(
				req,
				res,
				undefined,
				`El folio ${result.newFolio} fue reconstruido exitosamente`,
			);
		} catch (error) {
			next(error);
		}
	},
);

// GET /api/archive/list_of_archives
archives.get(
	"/",
	verifyToken,
	validationFields(schemaListArchivesValidations, "query"),
	async (request, response, next) => {
		try {
			const listArchives = request.query;
			const result = await GetAllArchives(listArchives);
			methodOK(request, response, result);
		} catch (error) {
			next(error);
		}
	},
);

// GET /api/archive/list_only_archives
archives.get(
	"/:archiveId",
	verifyToken,
	validationFields(multiUuidSchema(["archiveId"]), "params"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const result = await GetOnlyArchive(archiveId);
			methodOK(request, response, result);
		} catch (error) {
			next(error);
		}
	},
);

//POST /api/archives/create
archives.post(
	"/",
	verifyToken,
	validationFields(schemaCreateArchivesValidations, "body"),
	async (request, response, next) => {
		try {
			const insertArchive = request.body;
			const result = await InsertArchives(insertArchive);
			methodCreated(
				request,
				response,
				result,
				"Se inserto correctamente el archivo",
			);
		} catch (error) {
			next(error);
		}
	},
);

//PUT /api/archives/update/:id
archives.put(
	"/:archiveId",
	verifyToken,
	validationFields(multiUuidSchema(["archiveId"]), "params"),
	validationFields(schemaUpdateArchiveValidations, "body"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const archiveData = request.body;
			const result = await UpdateArchive(archiveId, archiveData);
			methodOK(
				request,
				response,
				result,
				"El archivo se actualizo correctamente",
			);
		} catch (error) {
			next(error);
		}
	},
);

//DELETE /api/archives/delete/:id
archives.delete(
	"/:archiveId",
	verifyToken,
	validationFields(multiUuidSchema(["archiveId"]), "params"),
	async (request, response, next) => {
		try {
			const archiveId = request.params.archiveId;
			const result = await DeleteArchive(archiveId);
			methodOK(
				request,
				response,
				undefined,
				`El archivo ${result.name} y ${result.deletedRelated} referencias fueron eliminados correctamente`,
			);
		} catch (error) {
			next(error);
		}
	},
);

export { archives };
