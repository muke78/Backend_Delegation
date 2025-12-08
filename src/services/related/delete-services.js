import { validateFoundToEliminated } from "../../helpers/index.js";
import { deleteRelatedModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const deleteRelatedService = async (relationId) => {
	const foundArchiveToEliminated = await validateFoundToEliminated(
		relationId,
		"related_entries_id",
		"description",
		"related_entries",
	);

	if (foundArchiveToEliminated.length === 0) {
		throw new NotFoundError("La referencia no fue encontrada");
	}

	const deleteArchiveFromID = await deleteRelatedModel(relationId);

	if (deleteArchiveFromID.affectedRows === 0) {
		throw new NotFoundError("la referencia no fue encontrada para eliminar");
	}

	return foundArchiveToEliminated[0];
};
