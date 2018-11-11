'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

UserModel.checkPassword = async function (username, password) {
            let user = await UserModel.findOne({ where: { username } });
            if(!user){
                return Promise.reject();
            }

            if (await bcrypt.compare(password, user.password)) {
                return Promise.resolve(user);
            } else {
                return Promise.reject();
            }
};

UserModel.generateToken = function (id) {
    return jwt.sign({ id }, secret, { expiresIn: '12h' }).toString();
}

UserModel.findByToken = function (token) {
    var decoded;

    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        return Promise.reject('Token couldnt be verified');
    }

    return this.findOne({
        where: {
            id: decoded.id
        }
    })
};

module.exports = UserModel;