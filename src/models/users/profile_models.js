import { connectionQuery } from "../../helpers/index.js";

export const listProfileModel = async (user_id) => {
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
                    WHERE user_id = ?;`;
	const params = [user_id];
	return await connectionQuery(query, params);
};
