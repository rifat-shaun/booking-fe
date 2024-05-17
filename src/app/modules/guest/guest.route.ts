import { Role } from '@prisma/client';
import express from 'express';
import { GuestController } from './guest.controller';
import auth from '../../middlewares/auth';

const router = express.Router();
// create guest
router.post('/', auth(Role.super_admin), GuestController.createGuest);

router.get('/', GuestController.getGuests);

router.patch('/:id', auth(Role.super_admin), GuestController.updateGuest);
router.delete('/:id', auth(Role.super_admin), GuestController.deleteGuest);

export const GuestRoute = router;
