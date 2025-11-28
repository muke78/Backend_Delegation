import { listArchivesModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const listArchiveService = async ({
	identifier,
	base_folio,
	name,
	doc_type,
	year,
	created_by,
	limit = 20,
	page = 1,
}) => {
	const result = await listArchivesModel(
		identifier,
		base_folio,
		name,
		doc_type,
		parseInt(year, 10),
		created_by,
		parseInt(limit, 10),
		parseInt(page, 10),
	);

	if (result.length === 0)
		throw new NotFoundError(
			"No se encontraron archivos con los filtros proporcionados",
			{
				details: `${JSON.stringify({
					identifier,
					base_folio,
					name,
					doc_type,
					year,
					created_by,
				})}`,
			},
		);
};
