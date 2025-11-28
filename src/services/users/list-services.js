import { listUsersModel } from "../../models/index.js";
import { NotFoundError } from "../../utils/error-utils.js";

export const listUsersService = async ({ role, limit = 20, page = 1 }) => {
	const result = await listUsersModel(
		role,
		parseInt(limit, 10),
		parseInt(page, 10),
	);

	if (result.rows.length === 0)
		throw new NotFoundError(
			"No se encontraron usuarios con los filtros proporcionados",
			{ details: `${JSON.stringify({ role })}` },
		);

	return result;
};
