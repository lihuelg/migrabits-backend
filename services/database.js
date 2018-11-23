'use strict';

const Sequelize = require('sequelize');

const config = require('../config/config');

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
//it needs to turn on events scheduler with SET GLOBAL event_scheduler = ON;
//to delete DROP EVENT ClearTokens
/* sequelize.query(
  'CREATE EVENT ClearTokens '
  +'ON SCHEDULE EVERY 5 MINUTE '
  +'DO '
  +'DELETE FROM blacklists WHERE ADDTIME(createdAt, "5:00.000000") > NOW()'); */

/* sequelize.query(
  'ALTER EVENT ClearTokens '
  +'ON SCHEDULE EVERY 1 MINUTE'
); */

module.exports = {sequelize};