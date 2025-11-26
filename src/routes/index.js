import { Router } from "express";
import { auth } from "./auth.routes.js";
import { config } from "../config/config.js";

const router = Router();

// ✅ 1. Se ocupa el path de la ruta para la api (/api/v1)
const base = config.api.basePath;

// ✅ 2. Construccion de rutas globales para el backend
router.use(`${base}/auth`, auth);

export { router };
