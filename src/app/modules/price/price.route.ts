import express from 'express';
import { PriceController } from './price.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

// create a price
router.post('/', PriceController.createPriceController);

// get all price
router.get('/', PriceController.getPrices);

// get all guest price
router.get('/adult-guest-price', PriceController.getPriceForAdultGuest);
router.get('/child-guest-price', PriceController.getPriceForChildGuest);

export const PriceRoute = router;
