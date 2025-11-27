import hashedArg from "argon2";

export const hashedPassword = async (password) =>
	await hashedArg.hash(password);

export const verifyHashedPassword = async (userPassword, password) =>
	await hashedArg.verify(userPassword, password);
