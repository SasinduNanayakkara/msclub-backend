import { Request, Response, NextFunction } from "express";
import ImageService from "../../util/image.handler";
import OrganizationService from "../services";

export const insertOrganization = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "organization-images";
	const organizationImagePath = await ImageService.uploadImage(request.file, bucketDirectoryName);
	request.body.imagePath = organizationImagePath;

	await OrganizationService.createOrganization(request.body, request.user._id)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const getOrganization = async (request: Request, response: Response, next: NextFunction) => {
	await OrganizationService.getOrganizationInfo()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const getOrganizationForAdmin = async (request: Request, response: Response, next: NextFunction) => {
	await OrganizationService.getOrganizationInfoForAdmin()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const updateOrganization = async (request: Request, response: Response, next: NextFunction) => {
	if (request.file) {
		const bucketDirectoryName = "organization-images";
		const organizationImagePath = await ImageService.uploadImage(request.file, bucketDirectoryName);
		request.body.imagePath = organizationImagePath;
	}
	const updatedBy = request.user && request.user._id ? request.user._id : null;
	const organizationId = request.body.organizationId;

	await OrganizationService.updateOrganizationInfo(organizationId, request.body, updatedBy)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
