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
	return `
		SELECT COUNT(*) as total
		FROM ${baseTable}
		${joins}
		${where}
	`;
};
