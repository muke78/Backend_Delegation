import { connectionQuery } from "../../helpers/index.js";
import { FieldsRequiredError } from "../../utils/error-utils.js";

export const updateRelatedModel = async (payload) => {
	const {
		description,
		event_date,
		responsible_person,
		responsible_role,
		notas,
		related_entries_id,
	} = payload;

	const fields = [];
	const params = [];

	if (description !== undefined) {
		fields.push("description = ?");
		params.push(description);
	}
	if (event_date !== undefined) {
		fields.push("event_date = ?");
		params.push(event_date);
	}
	if (responsible_person !== undefined) {
		fields.push("responsible_person = ?");
		params.push(responsible_person);
	}
	if (responsible_role !== undefined) {
		fields.push("responsible_role = ?");
		params.push(responsible_role);
	}
	if (notas !== undefined) {
		fields.push("notas = ?");
		params.push(notas);
	}

	if (fields.length === 0)
		throw new FieldsRequiredError("No se enviaron campos para actualizar");

	params.push(related_entries_id);

	const query = ` UPDATE related_entries
                    SET ${fields.join(", ")}
                    WHERE related_entries_id = ?;`;

	return await connectionQuery(query, params);
};
