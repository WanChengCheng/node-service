/*
 * File: connectServices.js
 * File Created: Monday, 5th November 2018 7:36:06 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import connectMongo from '../backing-services/mongo';
import connectRedis from '../backing-services/redis';
import connectMysql from '../backing-services/mysql';
import logger from './logger';

const log = logger.child({ context: '[Connect Service]' });

const connectServices = () => [
  //
  // ─── CONNECT MONGODB ────────────────────────────────────────────────────────────
  //
  (() => new Promise((resolve, reject) => {
    log.info('connecting mongo');
    const mongoConnection = connectMongo({
      nodes: JSON.parse(process.env.SERVICE_MONGO_NODES || null) || [],
      replset: process.env.SERVICE_MONGO_REPLSET,
      dbname: process.env.SERVICE_MONGO_DB_NAME,
      user: process.env.SERVICE_MONGO_USERNAME,
      pass: process.env.SERVICE_MONGO_PASSWORD,
    });
    mongoConnection.on('connected', () => {
      log.info('mongodb connected');
      resolve();
    });
    mongoConnection.on('error', (err) => {
      log.error(err, 'connect mongodb error');
      reject(err);
    });
  }))(),
  //
  // ─── CONNECT REDIS ──────────────────────────────────────────────────────────────
  //
  (() => new Promise((resolve, reject) => {
    log.info('connecting redis');
    const redis = connectRedis({
      host: process.env.SERVICE_REDIS_HOST,
      port: process.env.SERVICE_REDIS_PORT,
      password: process.env.SERVICE_REDIS_PASSWORD,
    });
    redis.on('ready', () => {
      log.info('redis connected');
      resolve();
    });
    redis.on('error', (err) => {
      log.error(err, 'connect redis error');
      reject(err);
    });
  }))(),
  //
  // ─── CONNECT MYSQL ──────────────────────────────────────────────────────────────
  //
  (() => new Promise((resolve, reject) => {
    log.info('connecting mysql');
    const sequelize = connectMysql({
      host: process.env.SERVICE_MYSQL_HOST,
      port: process.env.SERVICE_MYSQL_PORT,
      dbname: process.env.SERVICE_MYSQL_DBNAME,
      username: process.env.SERVICE_MYSQL_USERNAME,
      password: process.env.SERVICE_MYSQL_PASSWORD,
    });
    sequelize
      .authenticate()
      .then(() => {
        log.info('mysql connected');
        resolve();
      })
      .catch((err) => {
        log.error(err, 'connect mysql error');
        reject(err);
      });
  }))(),
];

export default connectServices;
