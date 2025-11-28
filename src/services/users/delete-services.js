import { validateFoundToEliminated } from "../../helpers/index.js";
import { deleteUserModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const deleteUserService = async (userId) => {
	const foundUserToEliminated = await validateFoundToEliminated(
		userId,
		"user_id",
		"username",
		"users",
	);

	if (foundUserToEliminated.length === 0) {
		throw new NotFoundError("El usuario no fue encontrado");
	}

	const deleteUserFromID = await deleteUserModel(userId);
	if (deleteUserFromID.affectedRows === 0) {
		throw new NotFoundError("El usuario no fue encontrado para eliminar");
	}

	return foundUserToEliminated[0];
};
