import { NotFoundError } from "../../utils/error-utils.js";
import { listRelatedWithArchivesService } from "../related/list-services.js";
import { listOnlyArchiveService } from "./list-only-services.js";

export const listDuplexArchiveAndRelatedService = async (
	archiveId,
	pagination,
) => {
	// 1. Obtener archivo (este servicio ya lanza NotFound si no existe)
	const [archive] = await listOnlyArchiveService(archiveId);

	// 2. Obtener referencias (no lanza error si no hay resultados)
	const extractRelated = await listRelatedWithArchivesService(
		archiveId,
		pagination,
		{ throwIfEmpty: false },
	);

	if (!extractRelated.rows?.length) {
		throw new NotFoundError(
			`No se encontraron referencias asociadas al archivo con folio ${archive.folio}`,
		);
	}

	const buildDuplexData = {
		archive,
		related: extractRelated.rows,
		pagination: extractRelated.pagination,
	};

	return buildDuplexData;
};
