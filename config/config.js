'use strict';

//needs refactoring

var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  let config = require('./environments.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}


const config = {};

config.db = {
    user: 'root',
    password: 'root',
    name: process.env.DB_NAME
};

config.db.details = {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
};

config.keys= {
    secret: ''
};

module.exports = config;