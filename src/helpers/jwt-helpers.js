import jwt from "jsonwebtoken";

import { config } from "../config/config.js";
import { NotFoundError } from "../utils/error-utils.js";

export const createToken = (user) => {
	const payload = {
		user_id: user.user_id,
		role: user.role,
	};

	if (!config.jwt.expiresIn) {
		throw new NotFoundError(
			"El tiempo de expiración no está definido en las variables de entorno",
		);
	}

	if (!config.jwt.secret) {
		throw new NotFoundError(
			"El secreto JWT no está definido en las variables de entorno",
		);
	}

	return jwt.sign(payload, config.jwt.secret, {
		expiresIn: config.jwt.expiresIn,
	});
};

// export const refreshToken = (token) => {
//     const decoded = jwt.verify(token, config.jwt.secret);

//     if (decoded.accountStatus === "Inactivo") {
//         throw {
//             statusCode: 403,
//             message: "Cuenta inactiva, porfavor contacta al administrador.",
//             code: "ACCOUNT_INACTIVE",
//             details:
//                 "La cuenta esta desactivada, no se puede generar un nuevo token.",
//         };
//     }

//     const payload = {
//         user_id: decoded.user_id,
//         role_id: decoded.role_id,
//     };

//     return jwt.sign(payload, config.jwt.secret, {
//         expiresIn: config.jwt.expiresIn,
//     });
// };
