import { findArchivesId } from "../../helpers/index.js";
import { NotFoundError } from "../../utils/error-utils.js";
import { listRelatedWithArchivesService } from "../related/list-services.js";
import { listOnlyArchiveService } from "./list-only-services.js";

export const listDuplexArchiveAndRelatedService = async (archiveId) => {
	const find = await findArchivesId(archiveId);

	if (find.length === 0)
		throw new NotFoundError(`No se encontro el archivo con ID: ${archiveId}`);

	/**
	 * Se extrae el servicio que lista un solo archivo para
	 * reutilizar funciones esta funcion su tarea es pasarle el
	 * id y regresa toda la data de el archive
	 *
	 * Objecto de archives: {}
	 *
	 */

	const extractArchive = await listOnlyArchiveService(archiveId);

	/**
	 * Se extrae las referencias que tienen como padre un solo archivo, para
	 * reutilizar funciones esta funcion su tarea es pasarle una propiedad
	 * archiveId y se le tienen que pasar datos extras como query params pero
	 * al querer sacar todas las referencias, se puede pasar como un objeto vacio
	 * y que saque todo en all, trayendo el arreglo de rows de forma correcta
	 *
	 */

	const extractRelated = await listRelatedWithArchivesService(
		archiveId,
		{},
		{ throwIfEmpty: false },
	);

	if (extractRelated.rows.length === 0) {
		const infoArchivo =
			extractArchive.length > 0
				? `folio ${extractArchive[0].folio}`
				: `ID ${archiveId}`;

		throw new NotFoundError(
			`No se encontraron referencias asociadas al archivo con ${infoArchivo}`,
		);
	}

	return {
		archive: extractArchive[0],
		related: extractRelated.rows,
	};
};
