"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blockDate_route_1 = require("../modules/blockDate/blockDate.route");
const guest_route_1 = require("../modules/guest/guest.route");
const location_route_1 = require("../modules/location/location.route");
const package_route_1 = require("../modules/package/package.route");
const price_route_1 = require("../modules/price/price.route");
const sslc_route_1 = require("../modules/sslCommerz/sslc.route");
const test_route_1 = require("../modules/test/test.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRoute,
    },
    {
        path: '/package',
        routes: package_route_1.PackageRoute,
    },
    {
        path: '/location',
        routes: location_route_1.LocationRoute,
    },
    {
        path: '/guest',
        routes: guest_route_1.GuestRoute,
    },
    {
        path: '/price',
        routes: price_route_1.PriceRoute,
    },
    {
        path: '/block-date',
        routes: blockDate_route_1.BlockDateRoute,
    },
    {
        path: '/booking',
        routes: booking_route_1.bookingRoute,
    },
    {
        path: '/sslcz',
        routes: sslc_route_1.SslczRoute,
    },
    {
        path: '/test',
        routes: test_route_1.TestRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
