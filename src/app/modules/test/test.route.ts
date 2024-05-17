import { Role } from '@prisma/client';
import express from 'express';
import { TestController } from './test.controller';
import testAuth from './testAuth';
import testPermission from './testPermissionAuth';

const router = express.Router();

router.get(
  '/',
  testAuth(Role.user, Role.admin),
  testPermission('category:create'),
  TestController.testPermission
);

export const TestRoute = router;
