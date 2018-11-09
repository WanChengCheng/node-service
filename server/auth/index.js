/*
 * File: index.js
 * File Created: Thursday, 8th November 2018 6:59:06 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import { Route } from 'express';
// import { body } from 'express-validator/check';
import { tokenSigner } from './authMiddleware';
import { serviceName, jwtIssuer, jwtSecret } from '../utils/env';

const auth = Route();
export const serviceIdentities = () => Promise.resolve([
  {
    name: serviceName,
    issuer: jwtIssuer,
    secret: jwtSecret,
  },
]);

export const signToken = tokenSigner(serviceIdentities)(serviceName);

// username + password

export default auth;
