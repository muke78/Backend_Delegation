import {
	deleteUserService,
	getUserForSelectService,
	insertUserService,
	listProfileService,
	listUsersService,
	searchUserService,
	updateUserService,
} from "../../services/index.js";

export const GetAllUsers = async (listUsers) => {
	const listGetAllUsers = await listUsersService(listUsers);
	return listGetAllUsers;
};

export const GetProfile = async (user_id) => {
	const listGetProfile = await listProfileService(user_id);
	return listGetProfile;
};

export const SearchOfUsers = async (email) => {
	const searchOfUsers = await searchUserService(email);
	return searchOfUsers;
};

export const GetUserForSelect = () => {
	return getUserForSelectService();
};

export const InsertUsers = async (user) => {
	const insertUsers = await insertUserService(user);
	return insertUsers;
};

export const UpdateUser = async (userId, userData) => {
	const updateUser = await updateUserService(userId, userData);
	return updateUser;
};

export const DeleteUser = async (userId) => {
	const deleteUser = await deleteUserService(userId);
	return deleteUser;
};
