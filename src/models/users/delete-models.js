import { connectionQuery } from "../../helpers/index.js";

export const deleteUserModel = async (userId) => {
	const query = `DELETE FROM users WHERE user_id = ?`;
	const params = [userId];
	return await connectionQuery(query, params);
};
