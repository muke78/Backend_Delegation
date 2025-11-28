// Definición de constantes para códigos de estado y errores
const ERROR_TYPES = {
	VALIDATION: { statusCode: 400, code: "VALIDATION" },
	BAD_REQUEST: { statusCode: 400, code: "BAD_REQUEST" },
	FIELDS_REQUIRED: { statusCode: 400, code: "FIELDS_REQUIRED" },
	AUTH: { statusCode: 401, code: "AUTH" },
	FORBIDDEN: { statusCode: 403, code: "FORBIDDEN" },
	NOT_FOUND: { statusCode: 404, code: "NOT_FOUND" },
	METHOD_NOT_ALLOWED: { statusCode: 405, code: "METHOD_NOT_ALLOWED" },
	REQUEST_TIMEOUT: { statusCode: 408, code: "REQUEST_TIMEOUT" },
	CONFLICT: { statusCode: 409, code: "CONFLICT" },
	GOOGLE_ACCOUNT: { statusCode: 409, code: "GOOGLE_ACCOUNT" },
	GONE: { statusCode: 410, code: "GONE" },
	PAYLOAD_TOO_LARGE: { statusCode: 413, code: "PAYLOAD_TOO_LARGE" },
	TOO_MANY_IDS: { statusCode: 413, code: "TOO_MANY_IDS" },
	UNPROCESSABLE_ENTITY: { statusCode: 422, code: "UNPROCESSABLE_ENTITY" },
	INACTIVE_USER: { statusCode: 423, code: "INACTIVE_USER" },
	TOO_MANY_REQUESTS: { statusCode: 429, code: "TOO_MANY_REQUESTS" },
	DATABASE: { statusCode: 500, code: "DATABASE" },
	INTERNAL_SERVER: { statusCode: 500, code: "INTERNAL_SERVER" },
	BAD_GATEWAY: { statusCode: 502, code: "BAD_GATEWAY" },
	SERVICE_UNAVAILABLE: { statusCode: 503, code: "SERVICE_UNAVAILABLE" },
	GATEWAY_TIMEOUT: { statusCode: 504, code: "GATEWAY_TIMEOUT" },
};

class ApiError extends Error {
	constructor(name, message, statusCode, code, details = null) {
		super(message);
		if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
			throw new Error("Invalid HTTP status code");
		}
		this.name = name;
		this.statusCode = statusCode;
		this.code = code;
		this.details = details ? { context: null, metadata: {}, ...details } : null;
		Error.captureStackTrace(this, this.constructor);
	}
}

const createErrorClass = (name, { statusCode, code }) =>
	class extends ApiError {
		constructor(message, details = null) {
			super(`${name} || Error`, message, statusCode, code, details);
		}
	};

// Generar clases de error dinámicamente
const Errors = Object.keys(ERROR_TYPES).reduce((acc, key) => {
	acc[key] = createErrorClass(key, ERROR_TYPES[key]);
	return acc;
}, {});

// Exportar clases individualmente para compatibilidad
export const ValidationError = Errors.VALIDATION;
export const BadRequestError = Errors.BAD_REQUEST;
export const FieldsRequiredError = Errors.FIELDS_REQUIRED;
export const AuthError = Errors.AUTH;
export const ForbiddenError = Errors.FORBIDDEN;
export const NotFoundError = Errors.NOT_FOUND;
export const MethodNotAllowedError = Errors.METHOD_NOT_ALLOWED;
export const RequestTimeoutError = Errors.REQUEST_TIMEOUT;
export const ConflictError = Errors.CONFLICT;
export const GoneError = Errors.GONE;
export const PayloadTooLargeError = Errors.PAYLOAD_TOO_LARGE;
export const TooManyIdsError = Errors.TOO_MANY_IDS;
export const UnprocessableEntityError = Errors.UNPROCESSABLE_ENTITY;
export const InactiveUserError = Errors.INACTIVE_USER;
export const TooManyRequestsError = Errors.TOO_MANY_REQUESTS;
export const DatabaseError = Errors.DATABASE;
export const InternalServerError = Errors.INTERNAL_SERVER;
export const BadGatewayError = Errors.BAD_GATEWAY;
export const ServiceUnavailableError = Errors.SERVICE_UNAVAILABLE;
export const GatewayTimeoutError = Errors.GATEWAY_TIMEOUT;

// Exportar el objeto Errors como default para uso alternativo
export default Errors;
