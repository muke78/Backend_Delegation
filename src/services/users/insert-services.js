import {
	findUserEmailBasic,
	generateUUID,
	hashedPassword,
} from "../../helpers/index.js";
import { insertUserModel } from "../../models/index.js";

export const insertUserService = async ({
	username,
	password,
	full_name,
	email,
	role,
}) => {
	const existingUser = await findUserEmailBasic(email);

	if (existingUser)
		throw new ConflictError("El correo ya se encuentra registrado");

	const hashPassword = await hashedPassword(password);

	const newUserId = generateUUID();

	const insertResult = await insertUserModel(
		newUserId,
		username,
		hashPassword,
		full_name,
		email,
		role,
	);

	if (insertResult.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo registrar el usuario en la base de datos",
		);

	return {
		username,
		full_name,
		email,
		role,
	};
};
