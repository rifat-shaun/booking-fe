"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("./test.controller");
const testAuth_1 = __importDefault(require("./testAuth"));
const testPermissionAuth_1 = __importDefault(require("./testPermissionAuth"));
const router = express_1.default.Router();
router.get('/', (0, testAuth_1.default)(client_1.Role.user, client_1.Role.admin), (0, testPermissionAuth_1.default)('category:create'), test_controller_1.TestController.testPermission);
exports.TestRoute = router;
