import { connectionQuery } from "../../helpers/index.js";

export const regenerateFolioModel = async (archiveId, newFolio) => {
	const query = `UPDATE archives SET folio = ? WHERE archives_id = ?`;
	return await connectionQuery(query, [newFolio, archiveId]);
};
