import { connectionQuery } from "../../helpers/index.js";

export const validateFolioModel = async (folio) => {
	const query = `SELECT folio FROM archives WHERE folio = ? LIMIT 1`;
	const rows = await connectionQuery(query, [folio]);
	return rows.length > 0;
};
