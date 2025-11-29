import { validateFoundToEliminated } from "../../helpers/index.js";
import { deleteArchiveModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const deleteArchiveService = async (archiveId) => {
	const foundArchiveToEliminated = await validateFoundToEliminated(
		archiveId,
		"archives_id",
		"name",
		"archives",
	);

	if (foundArchiveToEliminated.length === 0) {
		throw new NotFoundError("El archivo no fue encontrado");
	}

	const deleteArchiveFromID = await deleteArchiveModel(archiveId);

	if (deleteArchiveFromID.affectedRows === 0) {
		throw new NotFoundError("El archivo no fue encontrado para eliminar");
	}

	return foundArchiveToEliminated[0];
};
