import { listRelatedWithArchivesModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const listRelatedWithArchivesService = async (
	archiveId,
	{
		description,
		event_date,
		responsible_person,
		responsible_role,
		limit = 20,
		page = 1,
	},
	{ throwIfEmpty = true } = {},
) => {
	const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
	const safePage = Number(page) > 0 ? Number(page) : 1;

	const result = await listRelatedWithArchivesModel(
		archiveId,
		description,
		event_date,
		responsible_person,
		responsible_role,
		safeLimit,
		safePage,
	);

	if (throwIfEmpty && result.rows.length === 0)
		throw new NotFoundError(
			"No se encontraron referencias con los filtros proporcionados",
			{
				details: `${JSON.stringify({
					description,
					event_date,
					responsible_person,
					responsible_role,
				})}`,
			},
		);

	return result;
};
