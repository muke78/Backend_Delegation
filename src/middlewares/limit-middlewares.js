import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { TooManyRequestsError } from "./../utils/error-utils.js";

// Bloqueo burst - más restrictivo para prevenir spam
export const burstProtectionLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 min
	limit: 10, // 10 requests en 15 minutos (más restrictivo)
	handler: () => {
		throw new TooManyRequestsError(
			"Demasiadas solicitudes en poco tiempo. Intenta de nuevo en 15 minutos",
		);
	},
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: false,
	keyGenerator: (req, _res) => {
		if (req.query.apiKey) return req.query.apiKey;

		const ipv6Subnet = 64;
		return ipKeyGenerator(req.ip, ipv6Subnet);
	},
});

// Control normal - más permisivo para uso regular
export const normalLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutos
	limit: 5000,
	handler: () => {
		throw new TooManyRequestsError(
			"Demasiadas solicitudes en poco tiempo. Intenta de nuevo en 1 hora",
		);
	},
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req, _res) => {
		if (req.query.apiKey) return req.query.apiKey;

		const ipv6Subnet = 64;
		return ipKeyGenerator(req.ip, ipv6Subnet);
	},
});
