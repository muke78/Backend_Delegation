import express from "express";
import { config } from "../config/config.js";
import {
	schemaAuthUserValidations,
	schemaRegisterUserValidations,
} from "../validations/index.js";
import { validationFields } from "../middlewares/validation-middlewares.js";
import { methodCreated, methodOK } from "../server/methods-server.js";
import { AuthError } from "../utils/error-utils.js";
import { Login, Register } from "../controllers/index.js";

const auth = express.Router();

//POST /api/auth/logout
auth.post("/logout", async (request, response, next) => {
	try {
		const token = request.cookies?.access_token;

		if (!token) {
			throw new AuthError("No se encontro una sesion activa en la cookie");
		}

		response.clearCookie("access_token", {
			httpOnly: true,
			secure: config.nodeEnv === "production",
			sameSite: "strict",
		});

		methodOK(request, response, undefined, "Sesión cerrada correctamente");
	} catch (error) {
		next(error);
	}
});

//POST /api/auth/login
auth.post(
	"/login",
	validationFields(schemaAuthUserValidations, "body"),
	async (request, response, next) => {
		try {
			const userData = request.body;
			const token = await Login(userData);

			response.cookie("access_token", token, {
				httpOnly: true,
				secure: config.nodeEnv === "production",
				sameSite: "strict",
				maxAge: config.cookie.cookieMaxAge,
			});

			methodOK(request, response, undefined, "Sesion iniciada correctamente");
		} catch (error) {
			next(error);
		}
	},
);

//POST /api/auth/register
auth.post(
	"/register",
	validationFields(schemaRegisterUserValidations, "body"),
	async (request, response, next) => {
		try {
			const registerUser = request.body;
			const result = await Register(registerUser);
			methodCreated(request, response, result, "Se ha registrado exitosamente");
		} catch (error) {
			next(error);
		}
	},
);

export { auth };
