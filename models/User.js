const Sequelize = require('sequelize');

const {sequelize} = require('../config/db');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });
  
User.sync().then(() => {
    console.log('User table created');
});

module.exports = User;