import { searchArchiveModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const searchArchiveService = async (folio) => {
	const result = await searchArchiveModel(folio);

	if (result.length === 0) {
		throw new NotFoundError(`No se encontro el folio ${folio}`);
	}

	return result;
};
