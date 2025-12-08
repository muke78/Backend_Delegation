import { listUsersModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const listUsersService = async ({ role, limit = 20, page = 1 }) => {
	const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
	const safePage = Number(page) > 0 ? Number(page) : 1;

	const result = await listUsersModel(role, safeLimit, safePage);

	if (result.rows.length === 0)
		throw new NotFoundError(
			"No se encontraron usuarios con los filtros proporcionados",
			{ details: `${JSON.stringify({ role })}` },
		);

	return result;
};
