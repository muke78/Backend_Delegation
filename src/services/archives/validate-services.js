import { validateFolioModel } from "../../models/index.js";

export const validateFolioService = async (folio) => {
	return await validateFolioModel(folio);
};
