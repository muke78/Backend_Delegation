import {
	findArchivesId,
	validateFoundToEliminated,
} from "../../helpers/index.js";
import { deleteRelatedModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const deleteRelatedService = async (relationId, archiveId) => {
	const foundArchiveToEliminated = await validateFoundToEliminated(
		relationId,
		"related_entries_id",
		"description",
		"related_entries",
	);

	const findArchive = await findArchivesId(archiveId);

	if (foundArchiveToEliminated.length === 0)
		throw new NotFoundError(
			"La referencia no fue encontrada o puede que su archivo no exista",
		);

	if (findArchive === undefined)
		throw new NotFoundError(
			"El archivo no fue encontrado o puede que su referencia no exista",
		);

	const deleteRelatedFromID = await deleteRelatedModel(relationId);

	if (deleteRelatedFromID.affectedRows === 0) {
		throw new NotFoundError("La referencia no fue encontrada para eliminar");
	}

	return foundArchiveToEliminated[0];
};
