import hashedArg from "argon2";

import { ConflictError, DatabaseError } from "../../utils/error-utils.js";
import { registerUserModel } from "../../models/auth/register-models.js";

import { findUserEmailBasic, generateUUID } from "../../helpers/index.js";

export const registerUserService = async ({
	username,
	password,
	full_name,
	email,
	role,
}) => {
	const existingUser = await findUserEmailBasic(email);

	if (existingUser)
		throw new ConflictError("EL correo ya se encuentra registrado");

	const hashedPassword = await hashedArg.hash(password);

	const newUserId = generateUUID();

	const insertResult = await registerUserModel(
		newUserId,
		username,
		hashedPassword,
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
