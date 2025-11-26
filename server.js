import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { router } from "./src/routes/index.js";
import { config } from "./src/config/config.js";
import { corsOptions } from "./src/middlewares/cors.middlewares.js";
import { setupSwagger } from "./src/config/swagger.config.js";
import { errorHandler } from "./src/middlewares/error.middlewares.js";
import {
	burstProtectionLimiter,
	normalLimiter,
} from "./src/middlewares/limit.middlewares.js";

// Puerto que se tiene que ocupar
const port = config.port ?? 3000;

const app = express();

// ✅ 1. Configuracion de swagger para la documentacion de API's
setupSwagger(app);

// ✅ 2. Middlewares básicos
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(morgan("combined"));
app.use(helmet());

// ✅ 3 Ruta raíz de entrada cuando entras al servidor local
app.get("/", (_req, res) => {
	res.status(200).json({
		description:
			"Backend specializes in creating indexes for reference searches in a branch office",
		name: "Backend Delegation",
		version: "0.0.1",
		author: {
			name: "Khelde",
			github: "https://github.com/muke78",
		},
		api: "/api/v1",
		status: "🟢 API working correctly",
		documentation: `${config.docs.baseUrl}`,
	});
});

// ✅ 4. Rutas de la API (ya con rate limiting aplicado)
app.use(burstProtectionLimiter, normalLimiter, router);

// ✅ 5. Middleware de errores
app.use(errorHandler);

// ✅ 7. Asignacion del puerto para el backend
app.set("port", port);

// ✅ 8. Ejecucion del servidor de forma local
app.listen(app.get("port"), () => {
	console.log(
		`API funcionando correctamente, servidor corriendo en el puerto http://localhost:${port}`,
	);
});
