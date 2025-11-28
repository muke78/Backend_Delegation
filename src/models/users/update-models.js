import { connectionQuery } from "../../helpers/index.js";

export const updateUserModel = async ({
	username,
	full_name,
	email,
	role,
	password,
	user_id,
}) => {
	const fields = ["username = ?", "full_name = ?", "email = ?", "role = ?"];
	const params = [username, full_name, email, role];

	if (password) {
		fields.push("password_hash = ?");
		params.push(password);
	}

	params.push(user_id);

	const query = `UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`;
	return await connectionQuery(query, params);
};
