CREATE DATABASE IF NOT EXISTS `pocland`;
USE `pocland`;

CREATE TABLE IF NOT EXISTS `userPocs` (
  user_address VARCHAR(255),
  chain_id NUMERIC(10,0),
  poc_address VARCHAR(255),
  PRIMARY KEY (user_address, poc_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;