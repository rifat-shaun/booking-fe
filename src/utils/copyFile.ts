import fs from 'fs';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

// copy file from from one location to another
export const copyFile = async (source: string, destination: string) => {
  try {
    // copy file from source to destination
    fs.copyFileSync(
      `${process.cwd()}/public/${source}`,
      `${process.cwd()}${destination}`
    );
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in copying file'
    );
  }
};
