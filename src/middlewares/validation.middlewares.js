import { logger } from "../utils/logger.utils.js";

export const validationFields = (schema, property = "body") => {
	return (request, response, next) => {
		const { error } = schema.validate(request[property], { abortEarly: false });

		if (error) {
			logger.error({
				message: "Hay algunos errores en la entrada de campos",
				code: "VALIDATION",
				statusCode: 400,
				stack: error.stack,
				details: error.details.message,
				path: request.originalUrl,
				method: request.method,
				body: request.body,
				params: request.params,
				query: request.query,
				user: request.user?.user_id,
			});

			return response.status(400).json({
				success: false,
				httpStatus: 400,
				code: "VALIDATION",
				message: "Hay algunos errores en la entrada de campos",
				errores: error.details.map((err) => ({
					field: err.context.key,
					message: err.message,
				})),
			});
		}

		next();
	};
};
