import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TestService } from './test.service';

const testPermission = catchAsync(async (req, res) => {
  console.log('Test Permission');
  const result = await TestService.testPermission();
  console.log('Test Permission');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Test Permission',
    data: result,
  });
});

export const TestController = {
  testPermission,
};
