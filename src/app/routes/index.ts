import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { BlockDateRoute } from '../modules/blockDate/blockDate.route';
import { GuestRoute } from '../modules/guest/guest.route';
import { LocationRoute } from '../modules/location/location.route';
import { PackageRoute } from '../modules/package/package.route';
import { PriceRoute } from '../modules/price/price.route';
import { SslczRoute } from '../modules/sslCommerz/sslc.route';
import { TestRoute } from '../modules/test/test.route';
import { bookingRoute } from '../modules/booking/booking.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoute,
  },

  {
    path: '/package',
    routes: PackageRoute,
  },
  {
    path: '/location',
    routes: LocationRoute,
  },
  {
    path: '/guest',
    routes: GuestRoute,
  },
  {
    path: '/price',
    routes: PriceRoute,
  },
  {
    path: '/block-date',
    routes: BlockDateRoute,
  },
  {
    path: '/booking',
    routes: bookingRoute,
  },
  {
    path: '/sslcz',
    routes: SslczRoute,
  },

  {
    path: '/test',
    routes: TestRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
