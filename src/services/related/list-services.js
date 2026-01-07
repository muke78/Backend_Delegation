import { listGetAllRelatedModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const listGetAllRelatedService = async ({
	reference_folio,
	description,
	event_date,
	responsible_person,
	limit = 20,
	page = 1,
}) => {
	const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
	const safePage = Number(page) > 0 ? Number(page) : 1;

	const result = await listGetAllRelatedModel(
		reference_folio,
		description,
		event_date,
		responsible_person,
		safeLimit,
		safePage,
	);

	if (result.rows.length === 0)
		throw new NotFoundError(
			"No se encontraron relaciones con los filtros proporcionados",
			{
				details: `${JSON.stringify({
					reference_folio,
					description,
					event_date,
					responsible_person,
				})}`,
			},
		);

	return result;
};
