/*
 * File: index.js
 * File Created: Tuesday, 6th November 2018 8:56:59 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */
import { Router } from 'express';

const api = Router();

api.get('/', (req, res) => {
  res.json({
    status: 0,
    data: {
      message: 'Hello',
    },
  });
});

export default api;
