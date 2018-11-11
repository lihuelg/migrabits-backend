var User = require('../models/User');
var Blacklist = require('../models/Blacklist');

var authenticate = (req, res, next) => {
    var token = req.header('token');

    Blacklist.findOne({
        where: {
            token
        }
    }).then((token) => {
        if (token) {
            res.status(401).send('Token blacklisted');
        }
    })

    User.findByToken(token).then((user) => {
        if (!user){
            res.status(401).send('User not found by token');
        }
        
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send('Some error');
    });
};

module.exports = authenticate;