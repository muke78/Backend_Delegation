import { listRelationalDuplexPluginService } from "./list-relational-duplex-services.js";
import { listOnlyArchiveService } from "./list-only-services.js";

export const listDuplexArchiveAndRelatedService = async (
	archiveId,
	pagination,
) => {
	// 1. Obtener archivo (este servicio ya lanza NotFound si no existe)
	const [archive] = await listOnlyArchiveService(archiveId);

	/**
	 * 2. Obtener referencias de su archivo
	 * Este servicio vive internamente en archivos ya que es data conjunta
	 * se reutiliza el servicio sobre la misma capa de abstraccion de servicios,
	 * aunque el modelo apunta hacia el modulo de relaciones, pero la data se junta
	 * aqui (No se hacen mas validaciones sobre el id ya que la funcion de arrriba
	 * ya regresa un error si no se encuentra el id)
	 */

	const extractRelated = await listRelationalDuplexPluginService(
		archiveId,
		pagination,
	);

	const buildDuplexData = {
		archive,
		related: extractRelated.rows,
		pagination: extractRelated.pagination,
	};

	return buildDuplexData;
};
