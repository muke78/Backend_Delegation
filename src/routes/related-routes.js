import express from "express";
import { verifyToken } from "../middlewares/verify-jwt-middlewares.js";
import { validationFields } from "../middlewares/validation-middlewares.js";
import { schemaListRelatedValidations } from "../validations/index.js";
import { methodOK } from "../server/methods-server.js";
import { GetAllRelated } from "../controllers/related/related-controllers.js";

const related = express.Router();

// GET api/related
related.get(
	"/",
	verifyToken,
	validationFields(schemaListRelatedValidations, "query"),
	async (request, response, next) => {
		try {
			const listRelated = request.query;

			const result = await GetAllRelated(listRelated);
			methodOK(request, response, result);
		} catch (error) {
			next(error);
		}
	},
);

export { related };
