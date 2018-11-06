/*
 * File: server.js
 * File Created: Monday, 5th November 2018 3:39:19 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// load env file, this ENV_FILE should be set in npm scripts
const env = process.env.ENV_FILE || '.env';

const file = path.join(__dirname, env);

if (fs.existsSync(file)) {
  dotenv.config({
    path: file,
  });
}

module.exports = require('./build');
