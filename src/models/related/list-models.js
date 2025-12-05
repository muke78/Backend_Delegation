import {
	buildCountQuery,
	calculatePagination,
	connectionQuery,
} from "../../helpers/index.js";

export const listRelatedWithArchivesModel = async (
	archiveId,
	description,
	event_date,
	responsible_person,
	responsible_role,
	limit,
	page,
) => {
	let where = "WHERE 1=1";

	const values = [];

	if (description && description !== "All") {
		where += " AND description LIKE ?";
		values.push(`%${description}%`);
	}

	if (event_date && event_date !== "All") {
		where += " AND event_date = ?";
		values.push(event_date);
	}

	if (responsible_person && responsible_person !== "All") {
		where += " AND responsible_person = ?";
		values.push(responsible_person);
	}

	if (responsible_role && responsible_role !== "All") {
		where += " AND responsible_role = ?";
		values.push(responsible_role);
	}

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
                    ORDER BY reference_number ASC
                    LIMIT ? OFFSET ?;`;

	const rows = await connectionQuery(query, [...values, limit, offset]);

	return { rows, pagination };
};
