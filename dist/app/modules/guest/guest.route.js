"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const guest_controller_1 = require("./guest.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// create guest
router.post('/', (0, auth_1.default)(client_1.Role.super_admin), guest_controller_1.GuestController.createGuest);
router.get('/', guest_controller_1.GuestController.getGuests);
router.patch('/:id', (0, auth_1.default)(client_1.Role.super_admin), guest_controller_1.GuestController.updateGuest);
router.delete('/:id', (0, auth_1.default)(client_1.Role.super_admin), guest_controller_1.GuestController.deleteGuest);
exports.GuestRoute = router;
