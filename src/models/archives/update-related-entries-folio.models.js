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
                    archive_id = ?
                    AND reference_folio LIKE CONCAT(?, '%');`;
	const params = [newFolio, oldFolio, archiveId, oldFolio];

	return await connectionQuery(query, params);
};
