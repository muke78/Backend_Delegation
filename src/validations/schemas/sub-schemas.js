import Joi from "joi";

const MIN_YEAR = 1900;
const MAX_YEAR = 2050;

const UUID_V4_REGEX =
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const alphaNumericSchema = Joi.string()
	.trim()
	.pattern(/^[\p{L}0-9\s]+$/u, "solo letras y números")
	.min(2)
	.max(100)
	.messages({
		"string.base": "El campo debe ser un texto",
		"string.empty": "El campo no puede estar vacío",
		"string.pattern.name": "El campo solo puede contener letras y números",
		"string.min": "El campo es demasiado corto",
		"string.max": "El campo es demasiado largo",
	});

export const yearSchema = Joi.date()
	.iso()
	.min(`${MIN_YEAR}-01-01`)
	.max(`${MAX_YEAR}-01-01`)
	.messages({
		"date.base": "La fecha debe ser válida",
		"date.format": "La fecha debe tener formato ISO (YYYY-MM-DD)",
		"date.min": `La fecha no puede ser menor al año ${MIN_YEAR}`,
		"date.max": `La fecha no puede ser mayor al año ${MAX_YEAR}`,
	});

export const yearNumberSchema = Joi.number()
	.integer()
	.min(MIN_YEAR)
	.max(MAX_YEAR)
	.messages({
		"number.base": "El año debe ser un número",
		"number.empty": "El año no puede estar vacio",
		"number.integer": "El año debe ser un número entero",
		"number.min": `El año no puede ser menor a ${MIN_YEAR}`,
		"number.max": `El año no puede ser mayor a ${MAX_YEAR}`,
	});

export const nameUserSchema = Joi.string()
	.min(3)
	.max(25)
	.pattern(/^[A-Za-zÀ-ÿ0-9\s]+$/)
	.required()
	.messages({
		"string.pattern.base":
			"El nombre solo puede contener letras, números y espacios",
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

export const uuidSchema = Joi.string()
	.uuid({ version: ["uuidv4"] })
	.required()
	.messages({
		"string.uuid": "El id debe ser un UUID válido",
		"any.required": "El id es obligatorio",
	});

export const multiUuidSchema = (keys = []) => {
	const shape = {};

	for (const key of keys) {
		shape[key] = Joi.string()
			.uuid({ version: ["uuidv4"] })
			.required()
			.custom((value, helpers) => {
				if (!Joi.string().uuid().validate(value).value) {
					return helpers.error("uuid.invalid");
				}
				if (!UUID_V4_REGEX.test(value)) {
					return helpers.error("uuid.version");
				}

				return value;
			})
			.messages({
				"any.required": `El campo "${key}" es obligatorio`,
				"string.base": `El campo "${key}" debe ser una cadena de texto`,
				"string.empty": `El campo "${key}" no puede estar vacío`,
				"uuid.invalid": `El campo "${key}" debe tener un formato UUID válido`,
				"uuid.version": `El campo "${key}" debe ser un UUID versión 4 (v4)`,
			});
	}

	return Joi.object(shape);
};

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
