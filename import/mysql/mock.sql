/*
 * File: mock.sql
 * File Created: Tuesday, 6th November 2018 7:15:17 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
