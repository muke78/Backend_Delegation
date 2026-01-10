import {
	buildCountQuery,
	calculatePagination,
	connectionQuery,
} from "../../helpers/index.js";

export const listRelationalDuplexPluginModel = async (
	archiveId,

	limit,
	page,
) => {
	let where = "WHERE 1=1";

	const values = [];

	if (archiveId && archiveId !== "All") {
		where += " AND archive_id = ?";
		values.push(archiveId);
	}

	const countQuery = buildCountQuery("related_entries", "", where);
	const [countResult] = await connectionQuery(countQuery, values);
	const totalRecords = countResult.total;

	const { pagination, offset } = calculatePagination(totalRecords, page, limit);

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
                    ${where}
                    ORDER BY reference_number DESC
                    LIMIT ? OFFSET ?;`;

	const rows = await connectionQuery(query, [...values, limit, offset]);

	return { rows, pagination };
};
