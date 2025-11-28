import {
	buildCountQuery,
	calculatePagination,
	connectionQuery,
} from "../../helpers/index.js";
export const listUsersModel = async (role, limit, page) => {
	let where = "WHERE 1=1";

	const values = [];

	if (role && role !== "All") {
		where += " AND role = ?";
		values.push(role);
	}

	const countQuery = buildCountQuery("users", "", where);
	const [countResult] = await connectionQuery(countQuery, values);
	const totalRecords = countResult.total;

	const { pagination, offset } = calculatePagination(totalRecords, page, limit);

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
		            ${where}
		            ORDER BY created DESC, user_id DESC
		            LIMIT ? OFFSET ?`;
	const rows = await connectionQuery(query, [...values, limit, offset]);

	return { rows, pagination };
};
