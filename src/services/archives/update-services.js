import { findArchivesId } from "../../helpers/find-archives-by-id.js";
import {
	updateArchiveModel,
	updateRelatedEntriesFolio,
} from "../../models/index.js";
import {
	ConflictError,
	DatabaseError,
	NotFoundError,
} from "../../utils/error-utils.js";
import { validateFolioService } from "./validate-services.js";

export const updateArchiveService = async (
	archiveId,
	{
		identifier,
		base_folio,
		name,
		doc_type,
		year,
		storage_path,
		source_sheet,
		created_by,
	},
) => {
	const findFolio = await findArchivesId(archiveId);

	if (findFolio === undefined)
		throw new NotFoundError("No se encontro el folio que se quiere editar");

	const newIdentifier =
		identifier !== undefined ? identifier : findFolio.identifier;
	const newBaseFolio =
		base_folio !== undefined ? base_folio : findFolio.base_folio;
	const newFolio = `${newIdentifier}${newBaseFolio}`;

	const folioChanged = newFolio !== findFolio.folio;

	if (folioChanged) {
		const existingFolio = await validateFolioService(newFolio);
		if (existingFolio) {
			throw new ConflictError("El folio ya se encuentra registrado");
		}
	}

	const updateData = {
		archives_id: archiveId,
		identifier,
		base_folio,
		newFolio: folioChanged ? newFolio : undefined,
		name,
		doc_type,
		year,
		storage_path,
		source_sheet,
		created_by,
	};

	const result = await updateArchiveModel(updateData);

	if (result.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo actualizar el usuario en la base de datos",
		);

	// SOLO SI CAMBIA EL FOLIO SE ACTUALIZAN LAS ENTRADAS RELACIONADAS
	if (folioChanged) {
		await updateRelatedEntriesFolio(archiveId, findFolio.folio, newFolio);
	}

	return result.affectedRows > 0;
};
