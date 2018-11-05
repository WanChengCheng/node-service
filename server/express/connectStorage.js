/*
 * File: connectStorage.js
 * File Created: Monday, 5th November 2018 7:36:06 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import connectMongo from '../storage/mongo';
import connectRedis from '../storage/redis';
import logger from '../utils/logger';

const connectServices = () => [
  (() => new Promise((resolve, reject) => {
    const mongoConnection = connectMongo({});
    mongoConnection.on('connected', () => {
      logger.info('[MongoDB] connected');
      resolve();
    });
    mongoConnection.on('error', (err) => {
      logger.info(`[MongoDB] error:${err}`);
      reject(err);
    });
  }))(),
  (() => new Promise((resolve, reject) => {
    const redis = connectRedis({});
    redis.on('ready', () => {
      logger.info('[Redis] connected');
      resolve();
    });
    redis.on('error', (err) => {
      logger.info(`[Redis] error when connecting:${err}`);
      reject(err);
    });
  }))(),
];

export default connectServices;
