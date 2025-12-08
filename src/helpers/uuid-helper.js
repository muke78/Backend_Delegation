import crypto from "node:crypto";
import { ValidationError } from "../utils/error-utils.js";

export const generateUUID = () => {
	try {
		return crypto.randomUUID();
	} catch (err) {
		throw new ValidationError("Error interno al generar UUID.");
	}
};
