import {
	deleteRelatedService,
	insertRelatedService,
	listRelatedSpecifyService,
	listRelatedWithArchivesService,
	updateRelatedService,
} from "../../services/index.js";

export const GetRelatedSpecify = async (archiveId, relationId) => {
	const listGetRelatedSpecify = await listRelatedSpecifyService(
		archiveId,
		relationId,
	);
	return listGetRelatedSpecify;
};

export const GetRelatedWithArchives = async (archiveId, listRelated) => {
	const listGetRelatedWithArchives = listRelatedWithArchivesService(
		archiveId,
		listRelated,
	);
	return listGetRelatedWithArchives;
};

export const InsertRelated = async (related, archiveId) => {
	const insertRelated = await insertRelatedService(related, archiveId);
	return insertRelated;
};

export const UpdateRelated = async (relationId, relatedData) => {
	const updateRelated = await updateRelatedService(relationId, relatedData);
	return updateRelated;
};

export const DeleteRelated = async (relationId) => {
	const deleteRelated = await deleteRelatedService(relationId);
	return deleteRelated;
};
