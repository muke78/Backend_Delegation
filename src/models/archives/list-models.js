import {
	buildCountQuery,
	calculatePagination,
	connectionQuery,
} from "../../helpers/index.js";

export const listArchivesModel = async (
	identifier,
	base_folio,
	name,
	doc_type,
	year,
	created_by,
	limit,
	page,
) => {
	let where = "WHERE 1=1";

	const values = [];

	if (identifier && identifier !== "All") {
		where += " AND identifier = ?";
		values.push(identifier);
	}

	if (base_folio && base_folio !== "All") {
		where += " AND base_folio = ?";
		values.push(base_folio);
	}

	if (name && name !== "All") {
		where += " AND name = ?";
		values.push(name);
	}

	if (doc_type && doc_type !== "All") {
		where += " AND doc_type = ?";
		values.push(doc_type);
	}

	if (year && year !== "All") {
		where += " AND year = ?";
		values.push(year);
	}

	if (created_by && created_by !== "All") {
		where += " AND created_by = ?";
		values.push(created_by);
	}

	const countQuery = buildCountQuery("archives", "", where);
	const [countResult] = await connectionQuery(countQuery, values);
	const totalRecords = countResult.total;

	const { pagination, offset } = calculatePagination(totalRecords, page, limit);

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
                    create_by
                FROM archives
				${where}
				ORDER BY created DESC
				LIMIT ? OFFSET ?`;

	const rows = await connectionQuery(query, [...values, limit, offset]);

	return { rows, pagination };
};
