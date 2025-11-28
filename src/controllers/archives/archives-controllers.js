import { listArchiveService } from "../../services/index.js";

export const GetDuplexArchiveAndRelated = async (archiveId) => {
	const listGetDuplexArchiveAndRelated =
		await listDuplexArchiveAndRelatedService(archiveId);
	return listGetDuplexArchiveAndRelated;
};

export const SearchOfArchives = async (folio) => {
	const searchOfArchives = await searchArchiveServive(folio);
	return searchOfArchives;
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
