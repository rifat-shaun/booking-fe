"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromFS = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteFileFromFS = (filePath) => {
    // append public folder path to file path
    filePath = `./public/${filePath}`;
    // check if file exists
    const isExists = fs_1.default.existsSync(filePath);
    // delete file if exists
    if (isExists) {
        fs_1.default.unlinkSync(filePath);
    }
    return;
};
exports.deleteFileFromFS = deleteFileFromFS;
