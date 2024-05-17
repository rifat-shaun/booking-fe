"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const package_service_1 = require("./package.service");
const createPackageController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield package_service_1.PackageService.createPackage(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'create package successfully',
        data: result,
    });
}));
// get all packages controller
const getAllPackagesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield package_service_1.PackageService.getAllPackages();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'get all package successfully',
        data: result,
    });
}));
const getSinglePackageController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield package_service_1.PackageService.getSinglePackage(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'get single package successfully',
        data: result,
    });
}));
// update package data controller
const updatePackageData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield package_service_1.PackageService.updatePackageData(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'update package data successfully',
        data: result,
    });
}));
// update active status controller
const updatePackageStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield package_service_1.PackageService.updatePackageStatus(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'update package status successfully',
        data: result,
    });
}));
// update active days
const updatePackageDays = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { active_day } = req.body;
    const result = yield package_service_1.PackageService.updatePackageDays(id, active_day);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'update active days successfully',
        data: result,
    });
}));
// remove package days
const removePackageDays = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { remove_day } = req.body || {};
    const result = yield package_service_1.PackageService.removePackageDays(id, remove_day);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'remove package days successfully',
        data: result,
    });
}));
// update package start date
const updatePackageStartDate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { start_date } = req.body || {};
    const result = yield package_service_1.PackageService.updatePackageStartDate(id, start_date);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'update package start date successfully',
        data: result,
    });
}));
// update package End date
const updatePackageEndDate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { end_date } = req.body;
    const result = yield package_service_1.PackageService.updatePackageEndDate(id, end_date);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'update package end date successfully',
        data: result,
    });
}));
exports.packageController = {
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
