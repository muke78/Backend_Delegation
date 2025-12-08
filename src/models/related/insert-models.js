import { connectionQuery } from "../../helpers/index.js";

export const insertRelatedModel = async (
	newRelatedId,
	archiveId,
	nextNumber,
	newFolio,
	description,
	event_date,
	responsible_person,
	responsible_role,
	notas,
) => {
	const query = `
        INSERT INTO related_entries
        (related_entries_id, archive_id, reference_number, reference_folio, description, event_date, responsible_person, responsible_role, notas)
        VALUES (?,?,?,?,?,?,?,?,?);
    `;

	const params = [
		newRelatedId,
		archiveId,
		nextNumber,
		newFolio,
		description,
		event_date,
		responsible_person,
		responsible_role,
		notas,
	];

	return await connectionQuery(query, params);
};
