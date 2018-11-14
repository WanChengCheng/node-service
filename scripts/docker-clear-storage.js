/*
 * File: docker-clear-storage.js
 * File Created: Tuesday, 6th November 2018 11:29:20 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

require('dotenv').config();
const { spawn } = require('child_process');

const logger = require('pino')({
  prettyPrint: { colorize: true },
});

const project = process.env.SERVICE_NAME;

const storage = ['mongo', 'mongoimport', 'redis', 'mysql'];

const rmAllContainers = `docker rm -f ${storage.map(item => `${project}-${item}`).join(' ')}`;
const rmMongoImportImage = `docker rmi ${project}-mongoimport`;

// ! remove all the containers
// ! remove mongoImport image, rebuild it from yarn dev
const command = spawn(`${rmAllContainers};${rmMongoImportImage}`, {
  shell: true,
});

command.stdout.on('data', (data) => {
  logger.info(`${data}`);
});

command.stderr.on('data', (data) => {
  logger.error(`${data}`);
});

command.on('close', (code) => {
  logger.info(`complete with code ${code}`);
});

logger.info('remove storage:');
