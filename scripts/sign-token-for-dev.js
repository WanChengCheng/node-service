#!/usr/bin/env node
/*
 * File: sign-token-for-dev.js
 * File Created: Tuesday, 13th November 2018 12:22:41 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
  // path: path.join(__dirname, '../.prod.env'),
});

const logger = require('pino')({
  prettyPrint: true,
});

const jwt = require('jsonwebtoken');
const { jwtIssuer, jwtSecret } = require('../build/utils/env');

const ttl = '7 days';

const sign = () => new Promise((resolve, reject) => {
  jwt.sign(
    {
      info: 'for-dev',
    },
    jwtSecret,
    {
      expiresIn: ttl,
      issuer: jwtIssuer,
    },
    (err, token) => (err ? reject(err) : resolve(token)),
  );
});

sign().then(token => logger.info(`Authorization: Bearer ${token}`));
