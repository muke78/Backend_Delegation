import hashedArg from "argon2";

import { lastLogin } from "../../helpers/last.login.helpers.js";
import { createToken } from "../../helpers/jwt.helpers.js";
import { AuthError, NotFoundError } from "../../utils/error.utils.js";
import { findUserEmail } from "../../helpers/find.user.helpers.js";

export const loginService = async ({ email, password }) => {
	const user = await findUserEmail(email);

	if (!user) throw new NotFoundError("El usuario no ha podido ser encontrado");

	const isPasswordValid = await hashedArg.verify(user.password, password);

	if (!isPasswordValid)
		throw new AuthError("La contraseña es incorrecta o esta mal escrita");

	const token = createToken({
		user_id: user.user_id,
		role: user.role,
	});

	await lastLogin(user.user_id);

	return token;
};
