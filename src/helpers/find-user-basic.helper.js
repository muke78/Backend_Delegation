import { connectionQuery } from "./connection-helpers.js";

export const findUserEmailBasic = async (email) => {
	const query = `
        SELECT user_id, username, full_name, email, role
        FROM users
        WHERE email = ?
    `;
	const result = await connectionQuery(query, [email]);
	return result[0];
};
