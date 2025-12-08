import { connectionQuery } from "../../helpers/index.js";

export const getReferenceNumberFolioModel = async (archiveId) => {
	const query = ` SELECT 
                        reference_number
                    FROM
                        related_entries
                    WHERE
                        archive_id = ?
                    ORDER BY reference_number DESC
                    LIMIT 1;`;
	const params = [archiveId];
	const result = await connectionQuery(query, params);
	return result[0];
};
