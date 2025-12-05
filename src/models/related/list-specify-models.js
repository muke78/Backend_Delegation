import { connectionQuery } from "../../helpers/index.js";

export const listRelatedSpecifyModel = async (archiveId, relationId) => {
	const query = `SELECT * FROM related_entries WHERE archive_id = ? AND related_entries_id = ?;`;
	const params = [archiveId, relationId];

	return await connectionQuery(query, params);
};
