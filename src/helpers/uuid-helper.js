import {
	v4 as uuidv4,
	version as uuidVersion,
	validate as uuidValidate,
} from "uuid";
import { ValidationError } from "../utils/error-utils.js";

export const generateUUID = () => {
	const id = uuidv4();

	if (!uuidValidate(id) || uuidVersion(id) !== 4)
		throw new ValidationError(
			"Error interno: UUID generado no es válido o no es v4",
		);

	return id;
};
