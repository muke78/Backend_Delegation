import { connectionQuery } from "../../helpers/index.js";

export const listRelatedSpecifyModel = async (archiveId, relationId) => {
	const query = `SELECT 
						related_entries_id,
						archive_id,
						reference_number,
						reference_folio,
						description,
						event_date,
						responsible_person,
						responsible_role,
						notas,
						created,
						updated
					FROM
						related_entries
					WHERE
						archive_id = ?
							AND related_entries_id = ?;`;
	const params = [archiveId, relationId];

	return await connectionQuery(query, params);
};
