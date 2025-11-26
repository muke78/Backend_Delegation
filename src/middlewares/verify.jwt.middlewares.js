import jwt from "jsonwebtoken";

import { config } from "../config/config.js";
import { AuthError } from "../utils/error.utils.js";

export const verifyToken = (request, _response, next) => {
	const token = request.cookies?.access_token;

	if (!token) {
		throw new AuthError("Acceso no autorizado, token no proporcionado");
	}

	try {
		const decoded = jwt.verify(token, config.jwt.secret);
		request.user = decoded;
		next();
	} catch (_error) {
		throw new AuthError("Acceso no autorizado: token inválido");
	}
};
