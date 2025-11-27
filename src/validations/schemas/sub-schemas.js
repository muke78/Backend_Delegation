import Joi from "joi";

export const nameUserSchema = Joi.string()
	.min(3)
	.max(25)
	.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
	.required()
	.messages({
		"string.pattern.base": "El nombre solo puede contener letras y espacios",
		"string.min": "El nombre debe tener al menos 3 caracteres",
		"string.max": "El nombre debe tener como máximo 25 caracteres",
		"any.required": "El nombre es obligatorio",
	});

export const nameUsers = Joi.string()
	.min(3)
	.max(40)
	.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
	.required()
	.messages({
		"string.pattern.base": "El nombre solo puede contener letras y espacios",
		"string.min": "El nombre debe tener al menos 3 caracteres",
		"string.max": "El nombre debe tener como máximo 40 caracteres",
		"any.required": "El nombre es obligatorio",
	});

export const emailSchema = Joi.string()
	.email()
	.lowercase()
	.trim()
	.required()
	.messages({
		"string.email": "Debe ser un email valido",
		"string.empty": "El email no puede estar vacío",
		"any.required": "El email es obligatorio",
	});

export const passwordSchema = Joi.string()
	.min(6)
	.max(20)
	.pattern(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
	)
	.required()
	.messages({
		"string.min": "El password debe tener mínimo 6 caracteres",
		"string.max": "El password debe tener maximo 20 caracteres",
		"string.empty": "El password no puede estar vacio",
		"string.pattern.base":
			"La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
		"any.required": "El password es obligatorio",
	});

export const roleSchema = Joi.string()
	.valid("Administrador", "Capturista", "Consultora")
	.required()
	.messages({
		"any.required": "El rol es obligatorio",
		"any.only": "El rol debe ser uno de los valores permitidos",
		"string.base": "El rol debe ser un texto",
	});

export const uuidSchema = Joi.object({
	id: Joi.string()
		.uuid({ version: ["uuidv4"] })
		.required()
		.messages({
			"string.uuid": "El id debe ser un UUID válido",
			"any.required": "El id es obligatorio",
		}),
});

export const paginationSchema = Joi.object({
	limit: Joi.number()
		.integer()
		.min(1)
		.max(100)
		.optional()
		.default(20)
		.messages({
			"number.base": "El límite debe ser un número",
			"number.integer": "El límite debe ser un número entero",
			"number.min": "El límite debe ser al menos 1",
			"number.max": "El límite no puede ser mayor a 100",
		}),
	page: Joi.number().integer().min(1).optional().default(1).messages({
		"number.base": "La página debe ser un número",
		"number.integer": "La página debe ser un número entero",
		"number.min": "La página debe ser al menos 1",
	}),
});
