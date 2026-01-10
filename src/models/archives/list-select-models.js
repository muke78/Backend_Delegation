import { connectionQuery } from "../../helpers/index.js";

export const getArchivesForSelectModel = () => {
	const query = `
    SELECT 
        archives_id as id,
        CONCAT(identifier, ' - ', name) AS label
    FROM
        archives
    ORDER BY identifier ASC`;
	return connectionQuery(query, []);
};
