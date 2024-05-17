import express from 'express';
import { BlockDateController } from './blockDate.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
const router = express.Router();
router.post(
  '/create',
  auth(Role.super_admin),
  BlockDateController.createBlockDate,
);
router.get('/get', BlockDateController.getBlockDate);

export const BlockDateRoute = router;
