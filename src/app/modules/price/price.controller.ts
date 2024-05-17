import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import router from '../../routes';
import { PriceService } from './price.service';

// create price controller
const createPriceController = catchAsync(async (req, res) => {
  const result = await PriceService.createPrice(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create price successfully',
    data: result,
  });
});

// get all price list

const getPrices = catchAsync(async (req, res) => {
  const result = await PriceService.getPrices();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get all price successfully',
    data: result,
  });
});

// get price depends on location, package and guest
const getPriceForChildGuest = catchAsync(async (req, res) => {
  const { package_id, start_point_id, end_point_id, guest_id } =
    req.query || {};
  console.log(req.query);
  const result = await PriceService.getPriceForChildGuest(
    package_id as string,
    start_point_id as string,
    end_point_id as string,
    guest_id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get price successfully',
    data: result,
  });
});
// get price depends on location, package and guest
const getPriceForAdultGuest = catchAsync(async (req, res) => {
  const { package_id, start_point_id, end_point_id, guest_id } =
    req.query || {};
  const result = await PriceService.getPriceForAdultGuest(
    package_id as string,
    start_point_id as string,
    end_point_id as string,
    guest_id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get price successfully',
    data: result,
  });
});

export const PriceController = {
  createPriceController,
  getPrices,
  getPriceForAdultGuest,
  getPriceForChildGuest,
};
