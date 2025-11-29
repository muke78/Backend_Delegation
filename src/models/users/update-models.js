import { connectionQuery } from "../../helpers/index.js";
import { FieldsRequiredError } from "../../utils/error-utils.js";

export const updateUserModel = async (payload) => {
	const { username, full_name, email, role, password, user_id } = payload;

	const fields = [];
	const params = [];

	if (username !== undefined) {
		fields.push("username = ?");
		params.push(username);
	}

	if (full_name !== undefined) {
		fields.push("full_name = ?");
		params.push(full_name);
	}

	if (email !== undefined) {
		fields.push("email = ?");
		params.push(email);
	}

	if (role !== undefined) {
		fields.push("role = ?");
		params.push(role);
	}

	if (password !== undefined) {
		fields.push("password_hash = ?");
		params.push(password);
	}

	if (fields.length === 0) {
		throw new FieldsRequiredError("No se enviaron campos para actualizar");
	}

	params.push(user_id);

	const query = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE user_id = ?;
    `;

	return await connectionQuery(query, params);
};
