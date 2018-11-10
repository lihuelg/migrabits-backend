'use strict';

const Sequelize = require('sequelize');

const config = require('../config');

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.details,
);

module.exports = {sequelize};