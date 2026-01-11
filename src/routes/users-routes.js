import express from "express";
import {
	DeleteUser,
	GetAllUsers,
	GetProfile,
	GetUserForSelect,
	InsertUsers,
	SearchOfUsers,
	UpdateUser,
} from "../controllers/index.js";
import { verifyToken } from "../middlewares/verify-jwt-middlewares.js";
import { validationFields } from "../middlewares/validation-middlewares.js";
import { methodOK, methodCreated } from "../server/methods-server.js";
import {
	multiUuidSchema,
	schemaCreateUserValidations,
	schemaListUsersValidations,
	schemaSearchUserValidations,
	schemaUpdateUserValidations,
} from "../validations/index.js";

const users = express.Router();

// GET /api/users/list_of_users
users.get(
	"/",
	verifyToken,
	validationFields(schemaListUsersValidations, "query"),
	async (request, response, next) => {
		try {
			const listUsers = request.query;
			const result = await GetAllUsers(listUsers);
			methodOK(request, response, result);
		} catch (error) {
			next(error);
		}
	},
);

// GET /api/users/search
users.get(
	"/search",
	verifyToken,
	validationFields(schemaSearchUserValidations, "query"),
	async (request, response, next) => {
		try {
			const { email } = request.query;
			const result = await SearchOfUsers(email);
			methodOK(request, response, result, "Busqueda realizada correctamente");
		} catch (error) {
			next(error);
		}
	},
);

// GET /api/users/profile
users.get("/profile", verifyToken, async (request, response, next) => {
	try {
		const { user_id } = request.user;
		const result = await GetProfile(user_id);
		methodOK(request, response, result);
	} catch (error) {
		next(error);
	}
});

// GET /api/users/select
users.get("/select", verifyToken, async (request, response, next) => {
	try {
		const result = await GetUserForSelect();
		methodOK(request, response, result);
	} catch (error) {
		next(error);
	}
});

//POST /api/users/create
users.post(
	"/",
	verifyToken,
	validationFields(schemaCreateUserValidations, "body"),
	async (request, response, next) => {
		try {
			const insertUser = request.body;
			const result = await InsertUsers(insertUser);
			methodCreated(
				request,
				response,
				result,
				"Se inserto correctamente el usuario",
			);
		} catch (error) {
			next(error);
		}
	},
);

//PUT /api/users/update/:id
users.put(
	"/:id",
	verifyToken,
	validationFields(multiUuidSchema(["id"]), "params"),
	validationFields(schemaUpdateUserValidations, "body"),
	async (request, response, next) => {
		try {
			const userId = request.params.id;
			const userData = request.body;
			const result = await UpdateUser(userId, userData);
			methodOK(
				request,
				response,
				result,
				"El usuario se actualizo correctamente",
			);
		} catch (error) {
			next(error);
		}
	},
);

//DELETE /api/users/delete/:id
users.delete(
	"/:id",
	verifyToken,
	validationFields(multiUuidSchema(["id"]), "params"),
	async (request, response, next) => {
		try {
			const userId = request.params.id;
			const result = await DeleteUser(userId);
			methodOK(
				request,
				response,
				undefined,
				`El usuario ${result.username} fue eliminado correctamente`,
			);
		} catch (error) {
			next(error);
		}
	},
);

export { users };
