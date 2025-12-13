export const sanitizedBody = (body = {}) => {
	if (!body || typeof body !== "object") return body;

	return body.password
		? {
				...body,
				password: "[REDACTED]",
			}
		: body;
};
