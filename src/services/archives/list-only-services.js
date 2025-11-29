import { listOnlyArhiveModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const listOnlyArchiveService = async (archiveId) => {
	const result = await listOnlyArhiveModel(archiveId);

	if (result.length === 0)
		throw new NotFoundError(`No se encontro el archivo: ${result.name}`);

	return result;
};
