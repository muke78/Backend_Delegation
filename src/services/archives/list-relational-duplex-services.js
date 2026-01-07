import { listRelationalDuplexPluginModel } from "../../models/index.js";

export const listRelationalDuplexPluginService = async (
	archiveId,
	{ limit = 20, page = 1 },
) => {
	const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
	const safePage = Number(page) > 0 ? Number(page) : 1;

	const result = await listRelationalDuplexPluginModel(
		archiveId,
		safeLimit,
		safePage,
	);

	/**
	 * Se quita esta validacion por motivos de que el endpoint se junta con el duplex
	 * hacienmdo que los unicos filtros que lleguen solo sea el de paginacion y el
	 * id del archivo, no tenia sentido dejar los props adicionales, ademas que el servicio
	 * ya regresa un error si no se encuentra el id, este servicio queda limpio
	 */

	return result;
};
