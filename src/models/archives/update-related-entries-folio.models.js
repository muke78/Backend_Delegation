import { connectionQuery } from "../../helpers/index.js";

export const updateRelatedEntriesFolio = async (
	archiveId,
	oldFolio,
	newFolio,
) => {
	const query = `UPDATE related_entries 
                SET 
                    reference_folio = CONCAT(?,
                            SUBSTRING(reference_folio,
                                LENGTH(?) + 1))
                WHERE
                    archive_id = ?;`;
	const params = [newFolio, oldFolio, archiveId];

	return await connectionQuery(query, params);
};
