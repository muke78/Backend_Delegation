import { connectionQuery } from "../../helpers/index.js";

export const listOnlyArhiveModel = async (archiveId) => {
	const query = `SELECT 
                        archives_id,
                        identifier,
                        base_folio,
                        folio,
                        name,
                        doc_type,
                        year,
                        storage_path,
                        source_sheet,
                        created_by
                    FROM archives
                    WHERE archives_id = ?;`;
	const params = [archiveId];
	return await connectionQuery(query, params);
};
