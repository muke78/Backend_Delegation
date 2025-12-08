import { findRelatedId } from "../../helpers/index.js";
import { updateRelatedModel } from "../../models/index.js";
import { DatabaseError, NotFoundError } from "../../utils/error-utils.js";

export const updateRelatedService = async (
	relationId,
	{ description, event_date, responsible_person, responsible_role, notas },
) => {
	const findId = await findRelatedId(relationId);

	if (!findId)
		throw new NotFoundError(
			"No se encontro la referencia que se quiere editar",
		);

	const updatedData = {
		description,
		event_date,
		responsible_person,
		responsible_role,
		notas,
		related_entries_id: relationId,
	};

	const result = await updateRelatedModel(updatedData);

	if (result.affectedRows === 0)
		throw new DatabaseError(
			"No se pudo actualizar el usuario en la base de datos",
		);

	return result.affectedRows > 0;
};
