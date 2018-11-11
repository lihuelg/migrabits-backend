'use strict';

const Sequelize = require('sequelize');

const {sequelize} = require('../services/database');

var blacklistModel = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1
      },
    token: {
        type: Sequelize.STRING, //change type
        unique: true,
        allowNull: false
    }
};

var BlacklistModel = sequelize.define('blacklist', blacklistModel);

module.exports = BlacklistModel;