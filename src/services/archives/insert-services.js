import { validateFolioService } from "../../services/index.js";
import { generateUUID } from "../../helpers/index.js";
import { ConflictError, DatabaseError } from "../../utils/error-utils.js";
import { insertArchiveModel } from "../../models/index.js";

export const insertArchiveService = async ({
	identifier,
	base_folio,
	folio,
	name,
	doc_type,
	year,
	storage_path,
	source_sheet,
	created_by,
}) => {
	const newArchiveId = generateUUID();

	const newFolio = `${identifier}${base_folio}`;

	const existingFolio = await validateFolioService(newFolio);

	if (existingFolio)
		throw new ConflictError("El folio ya se encuentra registrado");

	const insertResult = await insertArchiveModel(
		newArchiveId,
		identifier,
		base_folio,
		newFolio,
		name,
		doc_type,
		year,
		storage_path,
		source_sheet,
		created_by,
	);

	if (insertResult.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo registrar el archivo en la base de datos",
		);

	return {
		identifier,
		base_folio,
		folio,
		name,
		doc_type,
		year,
		storage_path,
		source_sheet,
		created_by,
	};
};
