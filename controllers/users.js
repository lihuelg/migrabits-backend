'use strict';

const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
var Blacklist = require('../models/Blacklist');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

//Signup
router.post('/users', (req, res) => {    
  let user = new User(_.pick(req.body, ['username', 'password']));
  
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(() => {
    res.send(`User ${req.body.username}`);
  }).catch((e) => {
    res.status(400).send('Cannot create user' + e)
  });
});

//Login
router.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);  

  User.checkPassword(body.username, body.password).then((user) => {
    var token = User.generateToken(user.id);
    res.status(200).set({ token: token }).send('Great success!');
  }).catch(() => {
    res.status(400).send('Incorrect username or password');
  });
});

//Self-Awareness
router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//Log-out --- is this a GET request?
router.get('/users/me/logout', authenticate, (req, res) => {
  Blacklist.create({
    token: req.headers['token']
  }).then(() => {
    delete req.headers['token'];
    res.send('Great success!');
  });
});

router.get('/users/:id', (req, res) => {
  User.findOne({
    attributes: ['username'],
    where: {
      id: req.params.id
    }
  }).then((user) => {
    res.send(user);
  }).catch(() => {
    res.status(404).send('User not found');
  });
});

router.get('/users', (req, res) => {
  User.findAll({
    attributes: ['id', 'username', 'password', 'token']
  }).then((users) => {
    res.send(users);
  });
});

router.patch('/users/:id', (req, res) => {
  User.update({
    username: req.body.username
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send('User updated');
  })
});

router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send('User destroyed');
  })
});

module.exports = router;
