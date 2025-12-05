import { connectionQuery } from "./connection-helpers.js";

export const findRelatedId = async (relationId) => {
	const query = `
        SELECT * FROM related_entries 
        WHERE related_entries_id = ?;`;
	const result = await connectionQuery(query, [relationId]);
	return result[0];
};
