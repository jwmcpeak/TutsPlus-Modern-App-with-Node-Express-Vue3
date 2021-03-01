const express = require('express');
const router = express.Router();
const User = require('./../models/user').User;
const jwt = require('jsonwebtoken');

function isAuthenticate(req, res, nextf) {
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