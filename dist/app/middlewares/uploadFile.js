"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadFile = (fileFieldName, uploadsFolder) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            fs_1.default.mkdirSync(uploadsFolder, { recursive: true });
            cb(null, uploadsFolder);
        },
        filename: (req, file, cb) => {
            const fileExt = path_1.default.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
                '-' +
                Date.now();
            cb(null, fileName + fileExt);
        },
    });
    return (0, multer_1.default)({
        storage: storage,
        limits: {
            fileSize: 5000000, // 5MB
        },
        fileFilter: (req, file, cb) => {
            if (file.fieldname === fileFieldName) {
                if (file.mimetype === 'image/png' ||
                    file.mimetype === 'image/jpg' ||
                    file.mimetype === 'image/jpeg') {
                    cb(null, true);
                }
                else {
                    cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
                }
            }
            else {
                cb(new Error('There was an unknown error!'));
            }
        },
    });
};
exports.uploadFile = uploadFile;
