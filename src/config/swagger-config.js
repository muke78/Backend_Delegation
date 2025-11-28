import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Obtener __dirname equivalente en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = YAML.load(resolve(__dirname, "../docs/index.yaml"));

export const setupSwagger = (app) => {
	const theme = new SwaggerTheme();
	app.use(
		"/api/docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocument, {
			customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
		}),
	);
};
