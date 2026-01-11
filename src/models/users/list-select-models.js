import { connectionQuery } from "../../helpers/index.js";

export const getUserForSelectModel = () => {
	const query = `
                SELECT 
                user_id AS id, full_name AS label
            FROM
                users
            ORDER BY created DESC`;
	return connectionQuery(query, []);
};
