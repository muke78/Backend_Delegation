import { findArchivesId } from "../../helpers/index.js";
import { regenerateFolioModel } from "../../models/index.js";
import {
	ConflictError,
	DatabaseError,
	NotFoundError,
} from "../../utils/error-utils.js";
import { validateFolioService } from "./validate-services.js";

export const regenerateFolioService = async (archiveId) => {
	const findFolio = await findArchivesId(archiveId);

	if (findFolio === undefined)
		throw new NotFoundError(
			"No se encontró el archivo para regenerar el folio",
		);

	const newFolio = `${findFolio.identifier}${findFolio.base_folio}`;

	const existingFolio = await validateFolioService(newFolio);

	if (existingFolio)
		throw new ConflictError(
			"El folio generado ya existe y esta bien construido. No se pudo regenerar.",
		);

	const result = await regenerateFolioModel(archiveId, newFolio);

	if (result.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo regenerar el folio en la base de datos",
		);

	return { newFolio };
};
