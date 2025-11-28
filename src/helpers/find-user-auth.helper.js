import { connectionQuery } from "./connection-helpers.js";

export const findUserAuth = async (email) => {
	const query = `
        SELECT 
            user_id,
            username,
            email,
            role,
            password_hash
        FROM users
        WHERE email = ?
    `;
	const result = await connectionQuery(query, [email]);
	return result[0];
};
