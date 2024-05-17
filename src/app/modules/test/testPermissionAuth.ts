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

const testPermission =
  (...requiredPermissions: string[]) =>
  //   () =>
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

      //   // guard via role
      //   if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
      //     throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
      //   }

      // if verifiedUser.role === 'admin' or verifiedUser.role === 'super_admin' then next()
      if (
        verifiedUser.role === 'admin' ||
        verifiedUser.role === 'super_admin'
      ) {
        next();
      }

      // else check for permissions
      // check for requiredPermissions
      if (requiredPermissions.length) {
        // return array of permission name if value is true
        // return this format - [product:create, product:update, product:delete, product:view, category:update, category:delete, category:view]
        const permissions = Object.keys(verifiedUser.permissions).flatMap(
          key => {
            const permission = verifiedUser.permissions[key];
            return Object.keys(permission)
              .map(p => {
                if (permission[p] === true) {
                  return `${key}:${p}`;
                }
              })
              .filter(p => p !== undefined);
          }
        );

        // check for requiredPermissions in permissions
        const hasPermission = requiredPermissions.some(rp =>
          permissions.includes(rp)
        );

        if (!hasPermission) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default testPermission;
