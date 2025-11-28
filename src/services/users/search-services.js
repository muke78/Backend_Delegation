import { searchUserModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const searchUserService = async (email) => {
	const result = await searchUserModel(email);

	if (result.length === 0) {
		throw new NotFoundError(`No se encontro el correo ${email}`);
	}

	return result;
};
