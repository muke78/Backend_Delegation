import { connectionQuery } from "../../helpers/index.js";

export const searchArchiveModel = async (folio) => {
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
                    WHERE folio LIKE ?`;
	const params = [`%${folio}%`];
	return await connectionQuery(query, params);
};
