"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDateRoute = void 0;
const express_1 = __importDefault(require("express"));
const blockDate_controller_1 = require("./blockDate.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.Role.super_admin), blockDate_controller_1.BlockDateController.createBlockDate);
router.get('/get', blockDate_controller_1.BlockDateController.getBlockDate);
exports.BlockDateRoute = router;
