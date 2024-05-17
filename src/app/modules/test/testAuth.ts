import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

// jwt token decoded data example
/*
{
  "userId": "17c2adfc-af9f-45eb-a41a-3271d6688c1d",
  "role": "admin",
  "permissions": {
    "product": {
      "create": true,
      "update": true,
      "delete": true,
      "view": true
    },
    "category": {
      "create": false,
      "update": true,
      "delete": true,
      "view": true
    }
  },
  "iat": 1705998966,
  "exp": 1708590966
}
*/

const testAuth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      // const token = req.headers.authorization;

      // get token from header by splinting 'Bearer' and token
      const token = req.headers?.authorization?.split(' ')[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      // guard via role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default testAuth;
