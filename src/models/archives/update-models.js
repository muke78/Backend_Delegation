import { connectionQuery } from "../../helpers/index.js";
import { FieldsRequiredError } from "../../utils/error-utils.js";

export const updateArchiveModel = async (payload) => {
	const {
		archives_id,
		identifier,
		base_folio,
		newFolio,
		name,
		doc_type,
		year,
		storage_path,
		source_sheet,
		created_by,
	} = payload;

	const fields = [];
	const params = [];

	if (identifier !== undefined) {
		fields.push("identifier = ?");
		params.push(identifier);
	}

	if (base_folio !== undefined) {
		fields.push("base_folio = ?");
		params.push(base_folio);
	}

	if (newFolio !== undefined) {
		fields.push("folio = ?");
		params.push(newFolio);
	}

	if (name !== undefined) {
		fields.push("name = ?");
		params.push(name);
	}

	if (doc_type !== undefined) {
		fields.push("doc_type = ?");
		params.push(doc_type);
	}

	if (year !== undefined) {
		fields.push("year = ?");
		params.push(year);
	}

	if (storage_path !== undefined) {
		fields.push("storage_path = ?");
		params.push(storage_path);
	}

	if (source_sheet !== undefined) {
		fields.push("source_sheet = ?");
		params.push(source_sheet);
	}

	if (created_by !== undefined) {
		fields.push("created_by = ?");
		params.push(created_by);
	}

	if (fields.length === 0) {
		throw new FieldsRequiredError("No se enviaron campos para actualizar");
	}

	params.push(archives_id);

	const query = `
        UPDATE archives
        SET ${fields.join(", ")}
        WHERE archives_id = ?;
    `;

	return await connectionQuery(query, params);
};
