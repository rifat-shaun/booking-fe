import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { GuestService } from './guest.service';

const createGuest = catchAsync(async (req, res) => {
  const result = await GuestService.createGuest(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Guest created successfully',
    data: result,
  });
});

// get all guests
const getGuests = catchAsync(async (req, res) => {
  const result = await GuestService.getGuests();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Guest fetched successfully',
    data: result,
  });
});

// update guest
const updateGuest = catchAsync(async (req, res) => {
  const result = await GuestService.updateGuest(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Guest updated successfully',
    data: result,
  });
});

// delete guest
const deleteGuest = catchAsync(async (req, res) => {
  const result = await GuestService.deleteGuest(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Guest deleted successfully',
    data: result,
  });
});

export const GuestController = {
  createGuest,
  getGuests,
  updateGuest,
  deleteGuest,
};
