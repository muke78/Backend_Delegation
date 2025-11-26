import { pool } from "../lib/db.js";

export const connectionQuery = async (sql, params) => {
	const connection = await pool.getConnection();
	try {
		const [rows] = await connection.query(sql, params);
		return rows;
	} catch (error) {
		console.error("❌ Error en la consulta a la base de datos:");
		console.error(error);
		throw error;
	} finally {
		connection.release();
	}
};
