import { ForbiddenError, ValidationError } from "../utils/error-utils.js";

export const calculatePagination = (totalRecords, page, limit) => {
	const totalPages = Math.ceil(totalRecords / limit);
	const offset = (page - 1) * limit;

	return {
		offset,
		pagination: {
			currentPage: page,
			totalPages,
			totalRecords,
			recordsPerPage: limit,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		},
	};
};

export const buildCountQuery = (baseTable, joins = "", where = "WHERE 1=1") => {
	if (!/^[a-zA-Z0-9_]+$/.test(baseTable)) {
		throw new ValidationError(
			`El nombre de la tabla no es valido: ${baseTable}`,
		);
	}

	const forbidden = /(DROP|DELETE|INSERT|UPDATE|;|--|#)/i;
	if (forbidden.test(joins)) {
		throw new ForbiddenError(
			"Se detectó una cláusula JOIN potencialmente insegura",
		);
	}

	return `
        SELECT COUNT(*) AS total
        FROM \`${baseTable}\`
        ${joins}
        ${where}
    `;
};
