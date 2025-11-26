// Configuración de CORS
export const corsOptions = {
	origin: [
		"http://localhost:5173",
		"http://localhost:5174",
		"http://localhost:4173",
		"http://localhost:5173/login",
	],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Authorization", "Content-Type", "X-Requested-With"],
	credentials: true,
};
