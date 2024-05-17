import express from 'express';
import { SslczController } from './sslc.controller';

const router = express.Router();

router.get('/init', SslczController.paymentInitializer);
router.post('/success', SslczController.paymentSuccessController);
router.post('/fail', SslczController.paymentFailController);
router.post('/cancel', SslczController.paymentFailController);

export const SslczRoute = router;
