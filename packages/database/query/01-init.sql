CREATE DATABASE IF NOT EXISTS `pocland`;
USE `pocland`;

CREATE TABLE IF NOT EXISTS `pocs` (
  creator_address VARCHAR(255),
  chain_id NUMERIC(10,0),
  poc_address VARCHAR(255),
  PRIMARY KEY (creator_address, poc_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_pocs` (
  user_address VARCHAR(255),
  chain_id NUMERIC(10,0),
  poc_address VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;