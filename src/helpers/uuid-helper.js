import crypto from "node:crypto";
import { InternalServerError } from "../utils/error-utils.js";

export const generateUUID = () => {
	try {
		return crypto.randomUUID();
	} catch (err) {
		throw new InternalServerError(
			"Error interno al generar UUID.",
			err.message,
		);
	}
};
