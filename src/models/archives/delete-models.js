import { connectionQuery } from "../../helpers/index.js";

export const deleteArchiveModel = async (archiveId) => {
	const query = `DELETE FROM archives WHERE archives_id = ?;`;
	const params = [archiveId];
	return await connectionQuery(query, params);
};

export const countDeleteRelatedModel = async (archiveId) => {
	const query = ` SELECT COUNT(*) AS total 
					FROM related_entries 
					WHERE archive_id = ?;`;
	const params = [archiveId];

	const [{ total: relatedCount }] = await connectionQuery(query, params);
	return relatedCount;
};
