"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendFilesPathToRequestBody = exports.appendFilePathToRequestBody = void 0;
const appendFilePathToRequestBody = (req, key) => {
    var _a, _b, _c;
    // prepare image path and append in request body if image is uploaded
    console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.destination);
    if (req.file) {
        // prepare image path
        const imagePath = (((_b = req.file) === null || _b === void 0 ? void 0 : _b.destination) +
            ((_c = req.file) === null || _c === void 0 ? void 0 : _c.filename));
        // Remove "./public/" from the imagePath
        let newPath = '';
        if (imagePath) {
            newPath = imagePath.replace('./public/', '');
        }
        // append logo path to the body payload
        req.body[key] = newPath;
    }
    return req.body;
};
exports.appendFilePathToRequestBody = appendFilePathToRequestBody;
const appendFilesPathToRequestBody = (req, key) => {
    var _a;
    // prepare image path and append in request body if image is uploaded
    if (req.files) {
        // prepare image path
        const images = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.map((file) => {
            // prepare image path
            const imagePath = ((file === null || file === void 0 ? void 0 : file.destination) +
                (file === null || file === void 0 ? void 0 : file.filename));
            // Remove "./public/" from the imagePath
            let newPath = '';
            if (imagePath) {
                newPath = imagePath.replace('./public/', '');
            }
            return newPath;
        });
        // append logo path to the body payload
        req.body[key] = images;
    }
    return req.body;
};
exports.appendFilesPathToRequestBody = appendFilesPathToRequestBody;
