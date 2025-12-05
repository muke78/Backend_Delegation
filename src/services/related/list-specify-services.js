import { listRelatedSpecifyModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const listRelatedSpecifyService = async (archiveId, relationId) => {
	const listRelatedSpecify = await listRelatedSpecifyModel(
		archiveId,
		relationId,
	);

	if (listRelatedSpecify.length === 0)
		throw new NotFoundError(
			"No se encontraron referencias de forma especifica",
		);
	return listRelatedSpecify;
};
