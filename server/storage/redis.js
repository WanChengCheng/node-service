/*
 * File: redis.js
 * File Created: Monday, 5th November 2018 6:34:25 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import Redis from 'ioredis';
import { isProductionEnv } from '../utils/env';

const connectRedis = ({
  host,
  port,
  password,
  // Select the Redis logical database having the specified zero-based numeric index.
  //  New connections always use the database 0.
  db = 0,
}) => {
  const config = {
    // default to a host name 'redis' in development env.
    host: host || (!isProductionEnv && 'redis') || '',
    // default port of redis
    port: port || (!isProductionEnv && '6379') || '',
    db,
  };
  if (password) {
    config.password = password;
  }
  return new Redis(config);
};

export default connectRedis;
