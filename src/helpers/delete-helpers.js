import { connectionQuery } from "../helpers/index.js";

export const validateFoundToEliminated = async (
	paramId,
	filed_id,
	field_name,
	table_name,
) => {
	const query = `SELECT ${field_name} FROM ${table_name} WHERE ${filed_id} = ?`;
	const params = [paramId];
	return await connectionQuery(query, params);
};
