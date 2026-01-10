import {
	deleteArchiveService,
	getArchivesForSelectService,
	insertArchiveService,
	listArchiveService,
	listDuplexArchiveAndRelatedService,
	listOnlyArchiveService,
	regenerateFolioService,
	searchArchiveService,
	updateArchiveService,
	validateFolioService,
} from "../../services/index.js";

export const GetDuplexArchiveAndRelated = (archiveId, pagination) => {
	return listDuplexArchiveAndRelatedService(archiveId, pagination);
};

export const SearchOfArchives = async (folio) => {
	const searchOfArchives = await searchArchiveService(folio);
	return searchOfArchives;
};

export const GetArchivesForSelect = () => {
	return getArchivesForSelectService();
};

export const ValidateFolio = async (folio) => {
	const validateFolio = await validateFolioService(folio);
	return validateFolio;
};

export const RegenerateFolio = async (archiveId) => {
	const regenerateFolio = await regenerateFolioService(archiveId);
	return regenerateFolio;
};

export const GetAllArchives = async (listArchives) => {
	const listGetAllArchives = await listArchiveService(listArchives);
	return listGetAllArchives;
};

export const GetOnlyArchive = async (archiveId) => {
	const listGetOnlyArchive = await listOnlyArchiveService(archiveId);
	return listGetOnlyArchive;
};

export const InsertArchives = async (archive) => {
	const insertArchives = await insertArchiveService(archive);
	return insertArchives;
};

export const UpdateArchive = async (archiveId, archiveData) => {
	const updateArchive = await updateArchiveService(archiveId, archiveData);
	return updateArchive;
};

export const DeleteArchive = async (archiveId) => {
	const deleteArchive = await deleteArchiveService(archiveId);
	return deleteArchive;
};
