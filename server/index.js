/*
 * File: index.js
 * File Created: Monday, 5th November 2018 3:35:34 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import { server } from './express/server';
import connectServices from './utils/connectServices';
import logger from './utils/logger';

const log = logger.child({ context: '[Startup]' });
// server port, default 8080;
const port = process.env.PORT || 8080;

// connect services
Promise.all(connectServices())
  .then(() => {
    if (!module.parent) {
      server.listen(port, () => {
        log.info(`Started on port ${port} in ${server.get('env')} mode`);
      });
    }
  })
  .catch((err) => {
    log.error(err, 'cannot start service due to fatal error.');
  });

export default server;
