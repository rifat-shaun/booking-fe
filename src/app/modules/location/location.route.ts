import express from 'express';
import { LocationController } from './location.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = express.Router();
// create start location route
router.post(
  '/create-start-location',
  auth(Role.super_admin),
  LocationController.createStartLocation,
);
// create end location route
router.post(
  '/create-end-location',
  auth(Role.super_admin),
  LocationController.createEndLocation,
);
// create location route
router.post(
  '/create-location',
  auth(Role.super_admin),
  LocationController.createLocation,
);
// list start locations route
router.get('/list-start-locations', LocationController.listStartLocations);
// list end locations route
router.get('/list-end-locations', LocationController.listEndLocations);
// list locations route
router.get('/list-of-locations', LocationController.listOfLocations);

export const LocationRoute = router;
