'use strict';

const Sequelize = require('sequelize');

const config = require('../config');

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.details,
);

sequelize.sync().then(() => {
  console.log('All models sync');
});

//refactor(?) this and test if it works
sequelize.query(
  "CREATE EVENT ClearTokens "
  +"ON SCHEDULE EVERY 1 DAY "
  +"DO "
  +"DELETE FROM blacklists WHERE ADDTIME(createdAt, 60) < NOW()");

module.exports = {sequelize};