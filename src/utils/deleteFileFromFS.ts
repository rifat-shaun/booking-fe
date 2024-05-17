import fs from 'fs';

export const deleteFileFromFS = (filePath: string) => {
  // append public folder path to file path
  filePath = `./public/${filePath}`;
  // check if file exists
  const isExists = fs.existsSync(filePath);

  // delete file if exists
  if (isExists) {
    fs.unlinkSync(filePath);
  }

  return;
};
