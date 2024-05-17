import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PackageService } from './package.service';

const createPackageController = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await PackageService.createPackage(payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create package successfully',
    data: result,
  });
});

// get all packages controller

const getAllPackagesController = catchAsync(async (req, res) => {
  const result = await PackageService.getAllPackages();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get all package successfully',
    data: result,
  });
});

const getSinglePackageController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PackageService.getSinglePackage(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get single package successfully',
    data: result,
  });
});

// update package data controller

const updatePackageData = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await PackageService.updatePackageData(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update package data successfully',
    data: result,
  });
});

// update active status controller

const updatePackageStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await PackageService.updatePackageStatus(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update package status successfully',
    data: result,
  });
});

// update active days
const updatePackageDays = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { active_day } = req.body;
  const result = await PackageService.updatePackageDays(id, active_day);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update active days successfully',
    data: result,
  });
});

// remove package days

const removePackageDays = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { remove_day } = req.body || {};
  const result = await PackageService.removePackageDays(id, remove_day);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'remove package days successfully',
    data: result,
  });
});

// update package start date
const updatePackageStartDate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { start_date } = req.body || {};
  const result = await PackageService.updatePackageStartDate(id, start_date);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update package start date successfully',
    data: result,
  });
});

// update package End date
const updatePackageEndDate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { end_date } = req.body;
  const result = await PackageService.updatePackageEndDate(id, end_date);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update package end date successfully',
    data: result,
  });
});

export const packageController = {
  createPackageController,
  getAllPackagesController,
  updatePackageStatus,
  updatePackageDays,
  removePackageDays,
  updatePackageStartDate,
  updatePackageEndDate,
  updatePackageData,
  getSinglePackageController,
};
