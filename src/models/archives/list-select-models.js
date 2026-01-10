import { connectionQuery } from "../../helpers/index.js";

export const getArchivesForSelectModel = async () => {
	const query = `
                SELECT 
                    archives_id as id,
                    CONCAT(identifier, ' - ', name) AS label
                FROM
                    archives
                ORDER BY identifier ASC`;
	return await connectionQuery(query, []);
};
