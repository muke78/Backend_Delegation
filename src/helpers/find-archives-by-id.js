import { connectionQuery } from "./connection-helpers.js";

export const findArchivesId = async (archiveId) => {
	const query = `
        SELECT archives_id, identifier, base_folio 
        FROM archives 
        WHERE archives_id = ?;
    `;
	const result = await connectionQuery(query, [archiveId]);
	return result[0];
};
