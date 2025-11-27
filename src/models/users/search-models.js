import { connectionQuery } from "../../helpers/index.js";

export const searchUserModel = async (email) => {
	const query = `SELECT 
                        user_id,
                        username,
                        full_name,
                        email,
                        role,
                        last_login,
                        created,
                        updated
                    FROM users
                    WHERE email LIKE ?`;
	const params = [`%${email}%`];
	return await connectionQuery(query, params);
};
