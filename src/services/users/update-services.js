import {
	findEmailInOtherUser,
	findUserId,
	hashedPassword,
} from "../../helpers/index.js";
import { updateUserModel } from "../../models/index.js";
import {
	ConflictError,
	DatabaseError,
	NotFoundError,
} from "../../utils/error-utils.js";
export const updateUserService = async (
	userId,
	{ username, password, full_name, email, role },
) => {
	const existingUser = await findUserId(userId);

	if (!existingUser)
		throw new NotFoundError(
			"No se proporcionó un ID válido o el usuario no existe",
		);

	if (email) {
		const emailConflict = await findEmailInOtherUser(email, userId);
		if (emailConflict) {
			throw new ConflictError("El correo ya se encuentra registrado");
		}
	}

	const updateData = {
		user_id: userId,
		username,
		full_name,
		email,
		role,
	};

	if (password && password.trim() !== "") {
		updateData.password = await hashedPassword(password);
	}

	const result = await updateUserModel(updateData);

	if (result.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo actualizar el usuario en la base de datos",
		);

	return result.affectedRows > 0;
};
