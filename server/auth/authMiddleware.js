/*
 * File: authentication.js
 * File Created: Thursday, 8th November 2018 6:39:16 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import jwt from 'jsonwebtoken';
import jwtMiddleware from 'express-jwt';
import logger from '../utils/logger';

export class SecretMissingError extends Error {}
export class UnregisteredIssuerError extends Error {}

const log = logger.child({ context: '[Auth]' });

// name should be the name of the service (full name, not issuer),
//      name should be configured as SERVICE_NAME for each service component
//      that are recognizable among each other.
export const tokenSigner = getServiceIdentities => name => (content = {}, options = {}) => getServiceIdentities()
  .then((services) => {
    const service = services.find(item => item.name === name);
    if (!service) {
      log.info(`Cannot find secret for issuer with name:${name}`);
      log.info(`Recognized names are:${services.map(item => item.name).join(',')}`);
      throw SecretMissingError(`Secret missing for ${name}`);
    }
    return service;
  })
  .then(
    ({ secret, issuer }) => new Promise((resolve, reject) => {
      jwt.sign(
        {
          ...content,
        },
        secret,
        {
          issuer,
          ...options,
        },
        (err, res) => (err ? reject(err) : resolve(res)),
      );
    }),
  );

/* eslint max-len: 0 */
export const multitenancy = (getServiceIdentities, credentialsRequired = true) => function secretCallback(req, payload, done) {
  // the secretcallback must be a named function (cannot be async arrow function due to a bug of express-jwt)
  getServiceIdentities().then((services) => {
    const { iss: issuer } = payload || {};
    if (!issuer) {
      return done(new UnregisteredIssuerError('no issuer in token'));
    }
    const { secret } = services.find(item => item.issuer === issuer) || {};
    if (secret) {
      return done(null, secret);
    }
    logger.info('known issuers:', services.map(i => i.issuer).join(','));
    if (credentialsRequired) {
      return done(new UnregisteredIssuerError(`unknown issuer ${issuer}`), null);
    }
    return done(null, null);
  });
};

const generateAuthMiddleware = ({
  jwtSecret,
  credentialsRequired = true,
  queryTokenName = 'token',
  getToken,
  publicPath = [],
  unauthorizedMessage = 'INVALID TOKEN',
  isRevoked,
}) => {
  const fromHeaderOrQuery = (req) => {
    const {
      headers: { authorization },
      query: { [queryTokenName]: token },
    } = req;
    const [type, content] = authorization ? authorization.split(' ') : [];
    if (type === 'Bearer') {
      return content;
    }
    if (token) {
      return token;
    }
    return null;
  };

  return {
    authorized: jwtMiddleware({
      secret: jwtSecret,
      credentialsRequired,
      getToken: getToken || fromHeaderOrQuery,
      isRevoked,
    }).unless({
      path: publicPath,
    }),

    unauthorized(err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        return res.status(401).send(unauthorizedMessage);
      }
      if (err instanceof UnregisteredIssuerError) {
        return res.status(401).send(err.message);
      }
      return next(err);
    },
  };
};
export default generateAuthMiddleware;
