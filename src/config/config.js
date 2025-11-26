import dotenv from "dotenv";

dotenv.config();

const parseExpiration = (value) => {
	if (!value) return 1000 * 60 * 60 * 12;

	const match = value.match(/^(\d+)([smhd])$/i);
	if (!match) return Number(value);

	const num = parseInt(match[1], 10);
	const unit = match[2].toLowerCase();

	switch (unit) {
		case "s":
			return num * 1000;
		case "m":
			return num * 1000 * 60;
		case "h":
			return num * 1000 * 60 * 60;
		case "d":
			return num * 1000 * 60 * 60 * 24;
		default:
			return num;
	}
};

export const config = {
	port: process.env.PORT || 4000,
	nodeEnv: process.env.NODE_ENV,
	db: {
		host: process.env.DB_HOST || localhost,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		runtime: process.env.RUNTIME,
		waitForConnections: true,
		connectionLimit: 10,
		maxIdle: 10,
		idleTimeout: 60000,
		queueLimit: 0,
		enableKeepAlive: true,
		keepAliveInitialDelay: 0,
	},
	cookie: {
		cookieMaxAge: parseExpiration(process.env.EXP_COOKIE),
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.EXP_TOKEN,
	},
	docs: {
		baseUrl: process.env.BASE_URL_SWAGGER,
	},
	api: {
		basePath: `/api/${process.env.API_VERSION}`,
	},
	authGoogle: {
		client: process.env.CLIENT_ID,
		secret: process.env.CLIENT_SECRET,
		client_google: process.env.CLIENT_ID_GOOGLE,
	},
};
