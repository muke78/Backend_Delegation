import { connectionQuery } from "../../helpers/index.js";

export const deleteArchiveModel = async (archiveId) => {
	const query = `DELETE FROM archives WHERE archives_id = ?;`;
	const params = [archiveId];
	return await connectionQuery(query, params);
};
