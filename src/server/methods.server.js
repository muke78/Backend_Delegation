import crypto from "node:crypto";
import { logger } from "../utils/logger.utils.js";

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
			dataCount: formattedDataCount,
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

// De aqui para abajo se puede eliminar todos estos metodos

export const methodIncorrect = (request, response, message) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();

	response.status(400).json({
		success: false,
		error: {
			message: message || "Solicitud incorrecta. Verifica los datos enviados.",
			code: "BAD_REQUEST",
			details:
				"Algunos de los campos proporcionados no son válidos o están incompletos.",
			timestamp: timestamp,
			requestId: requestId,
		},
	});
};

export const methodUnauthorized = (request, response, message) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();

	response.status(401).json({
		success: false,
		error: {
			message:
				message ||
				"No autorizado. Es necesario autenticarse para acceder a este recurso.",
			code: "UNAUTHORIZED",
			details: "La solicitud requiere un token de autenticación válido.",
			timestamp: timestamp,
			requestId: requestId,
			path: request.originalUrl,
			method: request.method,
		},
	});
};

export const methodForbidden = (request, response, message) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();

	response.status(403).json({
		success: false,
		error: {
			message: message,
			code: "FORBIDDEN",
			timestamp: timestamp,
			requestId: requestId,
			path: request.originalUrl,
			method: request.method,
		},
	});
};

export const methodNotFound = (request, response, message) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();

	response.status(404).json({
		success: false,
		error: {
			message: message || "Recurso no encontrado.",
			code: "NOT_FOUND",
			details: "El recurso que buscas no existe o no está disponible.",
			timestamp: timestamp,
			requestId: requestId,
		},
	});
};

export const methodConflicts = (request, response, error) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();

	response.status(409).json({
		success: false,
		error: {
			message:
				error.message ||
				"Conflicto. El recurso ya existe o hay un conflicto con la solicitud.",
			code: "CONFLICT",
			details:
				"El recurso que intentas crear ya existe o la solicitud genera un conflicto con los datos actuales.",
			timestamp: timestamp,
			requestId: requestId,
			path: request.originalUrl,
			method: request.method,
		},
	});
};

export const methodTooManyRequests = (request, response, message) => {
	const timestamp = new Date().toISOString();
	const requestId = crypto.randomUUID();

	response.status(429).json({
		success: false,
		error: {
			message:
				message || "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
			code: "TOO_MANY_REQUESTS",
			details:
				"Has superado el número permitido de solicitudes en un periodo de tiempo. Esto puede deberse a un abuso del servicio o a una configuración estricta de límite de peticiones.",
			timestamp: timestamp,
			requestId: requestId,
			path: request.originalUrl,
			method: request.method,
		},
	});
};

export const methodError = (request, response, error) => {
	const timestamp = new Date().toISOString();
	const errorId = crypto.randomUUID();

	response.status(500).json({
		success: false,
		error: {
			message: error.message || "Se produjo un error inesperado.",
			code: "INTERNAL_SERVER_ERROR",
			details:
				"Ocurrió un problema en el servidor. Por favor, intenta más tarde.",
			timestamp: timestamp,
			errorId: errorId,
			stack: error.stack || "No se dispone de información adicional.",
			path: request.originalUrl,
			method: request.method,
		},
	});
};
