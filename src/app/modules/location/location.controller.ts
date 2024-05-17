import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LocationService } from './location.service';

// create start location
const createStartLocation = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await LocationService.createStartLocation(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create start location successfully',
    data: result,
  });
});

// create end location
const createEndLocation = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await LocationService.createEndLocation(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create end location successfully',
    data: result,
  });
});

// create location
const createLocation = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await LocationService.createLocation(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create location successfully',
    data: result,
  });
});
// list start locations
const listStartLocations = catchAsync(async (req, res) => {
  const result = await LocationService.listStartLocations();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'list start locations successfully',
    data: result,
  });
});

// list end locations
const listEndLocations = catchAsync(async (req, res) => {
  const result = await LocationService.listEndLocations();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'list end locations successfully',
    data: result,
  });
});

// list locations
const listOfLocations = catchAsync(async (req, res) => {
  const result = await LocationService.listOfLocations();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'list locations successfully',
    data: result,
  });
});

export const LocationController = {
  createStartLocation,
  createEndLocation,
  listStartLocations,
  listEndLocations,
  listOfLocations,
  createLocation,
};
