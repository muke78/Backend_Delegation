import { connectionQuery } from "../../helpers/index.js";

export const insertArchiveModel = async (
	newArchiveId,
	identifier,
	base_folio,
	newFolio,
	name,
	doc_type,
	year,
	storage_path,
	source_sheet,
	created_by,
) => {
	const query = `INSERT INTO archives 
    (archives_id, identifier, base_folio, folio, name, doc_type, year, storage_path, source_sheet, created_by)
    VALUES(?,?,?,?,?,?,?,?,?,?)`;

	const params = [
		newArchiveId,
		identifier,
		base_folio,
		newFolio,
		name,
		doc_type,
		year,
		storage_path,
		source_sheet,
		created_by,
	];

	return await connectionQuery(query, params);
};
