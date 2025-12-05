import { findArchivesId, generateUUID } from "../../helpers/index.js";
import {
	getReferenceNumberFolioModel,
	insertRelatedModel,
} from "../../models/index.js";
import { DatabaseError, NotFoundError } from "../../utils/error-utils.js";

export const insertRelatedService = async (
	{ description, event_date, responsible_person, responsible_role, notas },
	archiveId,
) => {
	const newRelatedId = generateUUID();

	const findFolio = await findArchivesId(archiveId);

	if (!findFolio)
		throw new NotFoundError(
			"No se encontró ningun archivo para guardar una referencia",
		);

	const lastReference = await getReferenceNumberFolioModel(archiveId);
	const nextNumber = (lastReference?.reference_number || 0) + 1;

	const newFolio = generateReferenceFolio(findFolio, nextNumber);

	const insertResult = await insertRelatedModel(
		newRelatedId,
		archiveId,
		nextNumber,
		newFolio,
		description,
		event_date,
		responsible_person,
		responsible_role,
		notas,
	);

	if (insertResult.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo registrar la referencia en la base de datos",
		);
};

const generateReferenceFolio = (archive, number) => {
	const formattedNumber = number < 10 ? `0${number}` : `${number}`;

	return `${archive.identifier}${archive.base_folio}${formattedNumber}`;
};
