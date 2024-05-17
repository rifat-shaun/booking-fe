"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRoute = void 0;
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("./location.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// create start location route
router.post('/create-start-location', (0, auth_1.default)(client_1.Role.super_admin), location_controller_1.LocationController.createStartLocation);
// create end location route
router.post('/create-end-location', (0, auth_1.default)(client_1.Role.super_admin), location_controller_1.LocationController.createEndLocation);
// create location route
router.post('/create-location', (0, auth_1.default)(client_1.Role.super_admin), location_controller_1.LocationController.createLocation);
// list start locations route
router.get('/list-start-locations', location_controller_1.LocationController.listStartLocations);
// list end locations route
router.get('/list-end-locations', location_controller_1.LocationController.listEndLocations);
// list locations route
router.get('/list-of-locations', location_controller_1.LocationController.listOfLocations);
exports.LocationRoute = router;
