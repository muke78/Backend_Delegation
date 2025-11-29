import { connectionQuery } from "../helpers/index.js";

const allowedTables = ["users", "archives"];
const allowedFields = ["user_id", "username", "email", "full_name", "name"];
const allowedIdFields = ["user_id", "id", "archives_id"];

export const validateFoundToEliminated = async (
	paramId,
	filed_id,
	field_name,
	table_name,
) => {
	// Validar tabla
	if (!allowedTables.includes(table_name)) {
		throw new Error(`Invalid table: ${table_name}`);
	}

	// Validar campos
	if (!allowedFields.includes(field_name)) {
		throw new Error(`Invalid field: ${field_name}`);
	}

	// Validar Id's
	if (!allowedIdFields.includes(filed_id)) {
		throw new Error(`Invalid ID field: ${filed_id}`);
	}

	const query = `
        SELECT \`${field_name}\`
        FROM \`${table_name}\`
        WHERE \`${filed_id}\` = ?
    `;

	return await connectionQuery(query, [paramId]);
};
