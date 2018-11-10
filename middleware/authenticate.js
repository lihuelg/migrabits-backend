var User = require('../models/user');

var authenticate = (req, res, next) => {
    if (!token) {
        res.status(401).send();
    }

    var token = req.header('token');

    User.findByToken(token).then((user) => {
        if (!user){
            res.status(401).send();
        }
        
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = authenticate;