"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
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
const testPermission = (...requiredPermissions) => 
//   () =>
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        //get authorization token
        // const token = req.headers.authorization;
        // get token from header by splinting 'Bearer' and token
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        req.user = verifiedUser;
        //   // guard via role
        //   if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        //     throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
        //   }
        // if verifiedUser.role === 'admin' or verifiedUser.role === 'super_admin' then next()
        if (verifiedUser.role === 'admin' ||
            verifiedUser.role === 'super_admin') {
            next();
        }
        // else check for permissions
        // check for requiredPermissions
        if (requiredPermissions.length) {
            // return array of permission name if value is true
            // return this format - [product:create, product:update, product:delete, product:view, category:update, category:delete, category:view]
            const permissions = Object.keys(verifiedUser.permissions).flatMap(key => {
                const permission = verifiedUser.permissions[key];
                return Object.keys(permission)
                    .map(p => {
                    if (permission[p] === true) {
                        return `${key}:${p}`;
                    }
                })
                    .filter(p => p !== undefined);
            });
            // check for requiredPermissions in permissions
            const hasPermission = requiredPermissions.some(rp => permissions.includes(rp));
            if (!hasPermission) {
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden Access');
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = testPermission;
