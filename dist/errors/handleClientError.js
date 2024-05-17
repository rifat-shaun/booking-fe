"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleClientError = (error) => {
    var _a;
    let errors = [];
    let message = '';
    let statusCode = 400;
    // console.log(error.code);
    if (error.code === 'P2025') {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record not found!';
        statusCode = http_status_1.default.NOT_FOUND;
        errors = [
            {
                path: '',
                message,
            },
        ];
    }
    else if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
        else if (error.message.includes('update()')) {
            message = 'Update failed';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
        else if (error.message.includes('create()')) {
            message = 'Create failed. Check your data';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
    }
    else if (error.code === 'P2002') {
        if (error.message.includes('Unique constraint failed')) {
            statusCode = http_status_1.default.CONFLICT;
            message = 'Same data already exists';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
    }
    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};
exports.default = handleClientError;
//"//\nInvalid `prisma.semesterRegistration.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.",
