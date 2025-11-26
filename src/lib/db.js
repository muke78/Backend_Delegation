import mysql from "mysql2/promise";
import { config } from "../config/config.js";

//Creando conexion pool y su configuracion
export const pool = mysql.createPool({
	host: config.db.host,
	port: config.db.port,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database,
	waitForConnections: config.db.waitForConnections,
	connectionLimit: config.db.connectionLimit,
	queueLimit: config.db.queueLimit,
	maxIdle: config.db.maxIdle,
	idleTimeout: config.db.idleTimeout,
	enableKeepAlive: config.db.enableKeepAlive,
	keepAliveInitialDelay: config.db.keepAliveInitialDelay,
	multipleStatements: config.db.multipleStatements,
});

// Función opcional para verificar conexión al iniciar
export const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log("✅ Conectado a la base de datos MySQL");
		connection.release();
		return true;
	} catch (error) {
		console.error("❌ Error conectando a la base de datos:", error.message);
		return false;
	}
};

// Probar conexión al cargar el módulo (opcional)
testConnection().then((success) => {
	if (success) {
		console.log("✅ Conexión a BD verificada correctamente");
	} else {
		console.error("❌ No se pudo establecer conexión con la BD");
	}
});
