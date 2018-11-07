/*
 * File: docker-rebuild-application.js
 * File Created: Tuesday, 6th November 2018 10:35:34 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

require('dotenv').config();
const { spawn } = require('child_process');

const logger = require('pino')({
  prettyPrint: { colorize: true },
});

const project = process.env.SERVICE_NAME;

const command = spawn(`docker rm -f ${project}; docker rmi ${project}`, {
  shell: true,
});

command.stdout.on('data', (data) => {
  logger.info(`rebuild app: ${data}`);
});

command.stderr.on('data', (data) => {
  logger.error(`${data}`);
});

command.on('close', (code) => {
  logger.info(`complete with code ${code}`);
});
