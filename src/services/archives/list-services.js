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
	const safeYear = year ? Number(year) : null;
	const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
	const safePage = Number(page) > 0 ? Number(page) : 1;

	const result = await listArchivesModel(
		identifier,
		base_folio,
		name,
		doc_type,
		safeYear,
		created_by,
		safeLimit,
		safePage,
	);

	if (result.rows.length === 0)
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

	return result;
};
