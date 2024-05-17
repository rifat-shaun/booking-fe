import { Role } from '@prisma/client';
import express from 'express';
import { packageController } from './package.controller';
import auth from '../../middlewares/auth';
// import { TestController } from './test.controller';
// import testAuth from './testAuth';
// import testPermission from './testPermissionAuth';

const router = express.Router();

// create package
router.post(
  '/',
  auth(Role.super_admin),
  packageController.createPackageController,
);

// get all packages
router.get('/', packageController.getAllPackagesController);

// get single package
router.get('/:id', packageController.getSinglePackageController);

// update package data
router.patch(
  '/:id',
  auth(Role.super_admin),
  packageController.updatePackageData,
);

// update active status
router.patch(
  '/update-active-status/:id',
  auth(Role.super_admin),
  packageController.updatePackageStatus,
);

// update active days
router.patch(
  '/update-active-days/:id',
  auth(Role.super_admin),
  packageController.updatePackageDays,
);

// remove package days
router.patch(
  '/remove-package-days/:id',
  auth(Role.super_admin),
  packageController.removePackageDays,
);

// update package start date
router.patch(
  '/update-package-start-date/:id',
  packageController.updatePackageStartDate,
);

// update package end date
router.patch(
  '/update-package-end-date/:id',
  packageController.updatePackageEndDate,
);

export const PackageRoute = router;
