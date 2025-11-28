import { connectionQuery } from "./connection-helpers.js";

export const findEmailInOtherUser = async (email, userId) => {
	const query = `SELECT user_id FROM users WHERE email = ? AND user_id != ?`;
	const params = [email, userId];
	const result = await connectionQuery(query, params);
	return result[0];
};
