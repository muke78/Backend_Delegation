import { findArchivesId, findRelatedId } from "../../helpers/index.js";
import { updateRelatedModel } from "../../models/index.js";
import { DatabaseError, NotFoundError } from "../../utils/error-utils.js";

export const updateRelatedService = async (
	relationId,
	archiveId,
	{ description, event_date, responsible_person, responsible_role, notas },
) => {
	const findRelated = await findRelatedId(relationId);

	const findArchive = await findArchivesId(archiveId);

	if (findRelated === undefined || findRelated.archive_id !== archiveId)
		throw new NotFoundError(
			"No se encontro la referencia que se quiere editar en este archivo",
		);

	if (findArchive === undefined)
		throw new NotFoundError("No se encontro el archivo que se quiere editar");

	const updatedData = {
		description,
		event_date,
		responsible_person,
		responsible_role,
		notas,
		related_entries_id: relationId,
	};

	const result = await updateRelatedModel(updatedData);

	if (result.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo actualizar el usuario en la base de datos",
		);

	return result.affectedRows > 0;
};
