import crypto from "node:crypto";
import { logger } from "../utils/logger-utils.js";
import { config } from "../config/config.js";

export const errorHandler = (err, request, response, _next) => {
	const status = err.statusCode || 500;
	const timestamp = new Date().toISOString();
	const errorId = crypto.randomUUID();

	logger.error({
		message: err.message || "Se produjo un error inesperado.",
		code: err.code || "INTERNAL_SERVER_ERROR",
		statusCode: status,
		stack: err.stack,
		details: err.details || null,
		path: request.originalUrl,
		method: request.method,
		query: request.query,
		body: request.body,
		params: request.params,
		user: request.user?.user_id,
		timestamp,
		errorId,
	});

	response.status(status).json({
		success: false,
		error: {
			message: err.message || "Se produjo un error inesperado.",
			code: err.code || "INTERNAL_SERVER_ERROR",
			details:
				err.details ||
				"Ocurrió un problema en el servidor. Por favor, intenta más tarde.",
			timestamp: config.nodeEnv === "production" ? undefined : timestamp,
			errorId: config.nodeEnv === "production" ? undefined : errorId,
			stack: config.nodeEnv === "production" ? undefined : err.stack,
			path: request.originalUrl,
			method: config.nodeEnv === "production" ? undefined : request.method,
			query: request.query,
		},
	});
};
