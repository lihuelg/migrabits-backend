'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {sequelize} = require('../services/database');

const secret = 'Secret-chan <3';

var userModel = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1
      },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

var userOptions = {
    hooks: {
        beforeValidate: hashPassword
    }
};

var UserModel = sequelize.define('user', userModel, userOptions);

function hashPassword(user) {
    if(user.changed('password')) {
        return bcrypt.hash(user.password, 10).then((password) => {
            user.password = password;
        });
    }
}

//needs less of smt
UserModel.checkPassword = function (username, password) {
        return new Promise(async function (resolve, reject) {
            let user = await UserModel.findOne({ where: { username } });
            if(!user){
                reject ('User not found');
            }

            if (await bcrypt.compare(password, user.password)) {
                resolve(user);
            } else {
                reject('Incorrect password');
            }
        })
};

UserModel.generateToken = function () {
    
}

UserModel.findByToken = function (token) {
    var decoded;

    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        return Promise.reject();
    }

    return this.findOne({
        where: {
            id: decoded.id
        }
    })
};

UserModel.sync().then(() => {
    console.log('User table created');
});

module.exports = UserModel;