import { connectionQuery } from "./connection.helpers.js";

export const findUserEmail = async (email) => {
	const query = `SELECT 
                        user_id, 
                        email, 
                        password_hash as password,
                        role
                    FROM users
                    WHERE email = ?`;
	const params = [email];
	const result = await connectionQuery(query, params);
	return result[0];
};
