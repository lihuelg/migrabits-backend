'use strict';

const config = {};

config.db = {
    user: 'root',
    password: 'root',
    name: 'api'
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