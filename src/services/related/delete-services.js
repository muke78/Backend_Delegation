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

	if (findArchive === undefined)
		throw new NotFoundError("El archivo no fue encontrado.");

	if (foundArchiveToEliminated.length === 0)
		throw new NotFoundError("La referencia no fue encontrada.");

	if (findArchive.archives_id !== archiveId)
		throw new NotFoundError(
			"La referencia no pertenece al archivo especificado.",
		);

	const deleteRelatedFromID = await deleteRelatedModel(relationId);

	if (deleteRelatedFromID.affectedRows === 0) {
		throw new NotFoundError("La referencia no fue encontrada para eliminar");
	}

	return foundArchiveToEliminated[0];
};
