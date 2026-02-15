import { findArchivesId, findRelatedId } from "../../helpers/index.js";
import {
	getReferenceNumberFolioModel,
	updateRelatedModel,
} from "../../models/index.js";
import { DatabaseError, NotFoundError } from "../../utils/error-utils.js";

export const updateRelatedService = async (
	relationId,
	archiveId,
	{ description, event_date, responsible_person, responsible_role, notas },
) => {
	const findRelated = await findRelatedId(relationId);

	const findArchive = await findArchivesId(archiveId);

	if (findRelated === undefined)
		throw new NotFoundError(
			"No se encontro la referencia que se quiere editar en este archivo",
		);

	if (findArchive === undefined)
		throw new NotFoundError("No se encontro el archivo que se quiere editar");

	const archiveChanged = findRelated.archive_id !== archiveId;

	let reference_number;
	let reference_folio;

	if (archiveChanged) {
		const archive = await findArchivesId(archiveId);

		const lastReference = await getReferenceNumberFolioModel(archiveId);

		reference_number = (lastReference?.reference_number || 0) + 1;

		reference_folio = generateReferenceFolio(archive, reference_number);
	}

	const updatedData = {
		reference_number,
		reference_folio,
		description,
		event_date,
		responsible_person,
		responsible_role,
		notas,
		related_entries_id: relationId,
		archive_id: archiveId,
	};

	console.log(updatedData);

	const result = await updateRelatedModel(updatedData, findRelated.archive_id);

	if (result.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo actualizar la relacion en la base de datos",
		);

	return result.affectedRows > 0;
};

const generateReferenceFolio = (archive, number, digits = 2) => {
	return `${archive.identifier}${archive.base_folio}${String(number).padStart(digits, "0")}`;
};
