import { connectionQuery } from "./connection-helpers.js";

export const lastLogin = (userId) => {
	const updateUserLastLogin = `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?`;
	return connectionQuery(updateUserLastLogin, [userId]);
};
