import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { blockDateService } from './blockDate.servece';

const createBlockDate = catchAsync(async (req, res) => {
  const result = await blockDateService.createBlockDate(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'create block date successfully',
    data: result,
  });
});
const getBlockDate = catchAsync(async (req, res) => {
  const result = await blockDateService.getBlockDate();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get block date successfully',
    data: result,
  });
});

// update block date controller
const updateBlockDate = catchAsync(async (req, res) => {
  const result = await blockDateService.updateBlockDate(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update block date successfully',
    data: result,
  });
});
export const BlockDateController = {
  createBlockDate,
  getBlockDate,
  updateBlockDate,
};
