import { connectionQuery } from "./connection-helpers.js";

export const findRelatedId = async (relationId) => {
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
						related_entries_id = ?;`;
	const result = await connectionQuery(query, [relationId]);
	return result[0];
};
