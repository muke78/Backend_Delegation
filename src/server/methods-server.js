import crypto from "node:crypto";
import { logger } from "../utils/logger-utils.js";

export const methodOK = (request, response, result, message) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();
	const totalDataCount = Array.isArray(result)
		? result.length
		: result && Array.isArray(result.rows)
			? result.rows.length
			: result
				? 1
				: 0;
	const formattedDataCount = totalDataCount.toLocaleString("es-MX");

	const responsePayload = {
		success: true,
		data: result || {},
		message: message || "Consulta realizada correctamente",
		metadata: {
			timestamp,
			requestId,
			dataCount: totalDataCount,
			dataCountFormatted: formattedDataCount,
		},
	};

	// Log automático para las respuestas 200
	logger.info({
		message: responsePayload.message,
		path: request.originalUrl,
		method: request.method,
		body: request.body?.email,
		params: request.params,
		query: request.query,
		dataCount: totalDataCount,
	});

	response.status(200).json(responsePayload);
};

export const methodCreated = (request, response, result, message) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();

	const responsePayload = {
		success: true,
		data: result,
		message: message || "Recurso creado exitosamente",
		metadata: {
			timestamp,
			requestId,
			dataCount: Array.isArray(result) ? result.length : result ? 1 : 0,
		},
	};

	// Log automático para las respuestas 201
	logger.info({
		message: responsePayload.message,
		path: request.originalUrl,
		method: request.method,
		user: request.user?.user_id,
		dataCount: responsePayload.metadata.dataCount,
	});

	response.status(201).json(responsePayload);
};
