import fs from 'fs';
import multer from 'multer';
import path from 'path';

export const uploadFile = (fileFieldName: string, uploadsFolder: string) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(uploadsFolder, { recursive: true });
      cb(null, uploadsFolder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLowerCase()
          .split(' ')
          .join('-') +
        '-' +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });
  return multer({
    storage: storage,
    limits: {
      fileSize: 5000000, // 5MB
    },
    fileFilter: (req, file, cb) => {
      if (file.fieldname === fileFieldName) {
        if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
        }
      } else {
        cb(new Error('There was an unknown error!'));
      }
    },
  });
};
