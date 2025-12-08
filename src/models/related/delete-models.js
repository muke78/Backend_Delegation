import { connectionQuery } from "../../helpers/index.js";

export const deleteRelatedModel = async (relationId) => {
	const query = `DELETE FROM related_entries WHERE related_entries_id = ?;`;
	const params = [relationId];
	return await connectionQuery(query, params);
};
