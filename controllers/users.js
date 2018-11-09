const express = require('express')

const User = require('../models/User');

const router = express.Router();

router.post('/users', (req, res) => {  
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(() => {
    res.send(`User ${req.body.username}`);
  }).catch(() => {
    res.status(400).send('Cannot create user')
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
  });
});

router.get('/users', (req, res) => {
  User.findAll().then((users) => {
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
