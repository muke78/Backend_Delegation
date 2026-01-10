import {
	listGetAllRelatedService,
	listRelatedSpecifyService,
	insertRelatedService,
	updateRelatedService,
	deleteRelatedService,
} from "../../services/index.js";

export const GetRelatedSpecify = async (archiveId, relationId) => {
	const listGetRelatedSpecify = await listRelatedSpecifyService(
		archiveId,
		relationId,
	);
	return listGetRelatedSpecify;
};

export const GetAllRelated = async (listRelated) => {
	const listGetAllRelated = await listGetAllRelatedService(listRelated);
	return listGetAllRelated;
};

export const InsertRelated = async (related, archiveId) => {
	const insertRelated = await insertRelatedService(related, archiveId);
	return insertRelated;
};

export const UpdateRelated = async (relationId, archiveId, relatedData) => {
	const updateRelated = await updateRelatedService(
		relationId,
		archiveId,
		relatedData,
	);
	return updateRelated;
};

export const DeleteRelated = async (relationId, archiveId) => {
	const deleteRelated = await deleteRelatedService(relationId, archiveId);
	return deleteRelated;
};
