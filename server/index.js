/*
 * File: index.js
 * File Created: Monday, 5th November 2018 3:35:34 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import { server, service } from './express/server';
import api from './api';

service.use('/api', api);

export default server;
