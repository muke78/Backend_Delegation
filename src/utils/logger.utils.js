import { createLogger, format, transports } from "winston";

const filterOnly = (level) => {
	return format((info) => (info.level === level ? info : false))();
};

export const logger = createLogger({
	level: "info",
	format: format.combine(
		format.timestamp(),
		format.errors({ stack: true }),
		format.json(),
	),
	transports: [
		// Solo captura los errores entrantes
		new transports.File({
			filename: "src/logs/error.log",
			format: format.combine(filterOnly("error"), format.json()),
		}),
		// Solo captura la informacion entrante
		new transports.File({
			filename: "src/logs/info.log",
			format: format.combine(filterOnly("info"), format.json()),
		}),
	],
});
