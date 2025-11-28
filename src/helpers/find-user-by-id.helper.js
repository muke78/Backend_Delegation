import { connectionQuery } from "./connection-helpers.js";

export const findUserId = async (userId) => {
	const query = `SELECT user_id FROM users WHERE user_id = ?`;
	const result = await connectionQuery(query, [userId]);
	return result[0];
};
