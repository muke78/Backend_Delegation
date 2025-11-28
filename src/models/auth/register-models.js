import { connectionQuery } from "../../helpers/index.js";

export const registerUserModel = async (
	newUserId,
	username,
	password,
	full_name,
	email,
	role,
) => {
	const query = `INSERT INTO users (user_id, username, password_hash, full_name, email, role)
                   VALUES (?, ?, ?, ?, ?, ?);`;

	const params = [newUserId, username, password, full_name, email, role];
	return await connectionQuery(query, params);
};
