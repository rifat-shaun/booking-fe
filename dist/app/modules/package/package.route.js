"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const package_controller_1 = require("./package.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
// import { TestController } from './test.controller';
// import testAuth from './testAuth';
// import testPermission from './testPermissionAuth';
const router = express_1.default.Router();
// create package
router.post('/', (0, auth_1.default)(client_1.Role.super_admin), package_controller_1.packageController.createPackageController);
// get all packages
router.get('/', package_controller_1.packageController.getAllPackagesController);
// get single package
router.get('/:id', package_controller_1.packageController.getSinglePackageController);
// update package data
router.patch('/:id', (0, auth_1.default)(client_1.Role.super_admin), package_controller_1.packageController.updatePackageData);
// update active status
router.patch('/update-active-status/:id', (0, auth_1.default)(client_1.Role.super_admin), package_controller_1.packageController.updatePackageStatus);
// update active days
router.patch('/update-active-days/:id', (0, auth_1.default)(client_1.Role.super_admin), package_controller_1.packageController.updatePackageDays);
// remove package days
router.patch('/remove-package-days/:id', (0, auth_1.default)(client_1.Role.super_admin), package_controller_1.packageController.removePackageDays);
// update package start date
router.patch('/update-package-start-date/:id', package_controller_1.packageController.updatePackageStartDate);
// update package end date
router.patch('/update-package-end-date/:id', package_controller_1.packageController.updatePackageEndDate);
exports.PackageRoute = router;
