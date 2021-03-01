const express = require('express');
const router = express.Router();
const User = require('./../models/user').User;
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    let header = req.get('Authorization') ?? '';
    let noAuth = {err: 'Invalid token', noAuth: true};

    if (header.toLowerCase().indexOf('bearer') === -1) {
        return res.status(401).send(noAuth);
    }

    let token = header.split(' ')[1];

    if (!token) {
        return res.status(401).send(noAuth);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).send(noAuth);

        User.findById(decoded.id, (err, user) => {
            if (err || !user) return res.status(401).send(noAuth);

            req.readerUser = user;

            next();
        });
    });
}

router.get('/feeds', isAuthenticated, (req, res) => {
    res.send({feeds: req.readerUser.feeds});
});

router.post('/feeds', isAuthenticated, (req, res) => {
    let name = req.body.name;
    let url = req.body.url;
    let user = req.readerUser;

    if (!name || !url) {
        return res.status(422).send({
            err: 'Please supply a name and URL.'
        });
    }

    user.feeds.push({
        name,
        url
    });

    user.save();

    res.send({feeds: user.feeds});
});

module.exports = router;