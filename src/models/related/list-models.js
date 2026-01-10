import {
	buildCountQuery,
	calculatePagination,
	connectionQuery,
} from "../../helpers/index.js";

export const listGetAllRelatedModel = async (
	reference_folio,
	description,
	event_date,
	responsible_person,
	limit,
	page,
) => {
	let where = "WHERE 1=1";

	const values = [];

	if (reference_folio && reference_folio !== "All") {
		where += " AND reference_folio LIKE ?";
		values.push(`%${reference_folio}%`);
	}

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
                    ORDER BY created DESC
                    LIMIT ? OFFSET ?;`;

	const rows = await connectionQuery(query, [...values, limit, offset]);

	return { rows, pagination };
};
