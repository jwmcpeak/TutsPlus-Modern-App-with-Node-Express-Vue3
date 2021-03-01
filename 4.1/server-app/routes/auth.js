const express = require('express');
const router = express.Router();
const User = require('./../models/user').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({
            err: 'Please supply an email address and password'
        });
    }

    User.findOne({email}, (err, user) => {
        if (err) return res.status(500).send({err: 'Something went horribly wrong'});
        if (!user) return res.status(401).send({err: 'The username and/or password incorrect'});

        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.status(401).send({err: 'The username and/or password incorrect'});
            }

            let token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: 86400});

            res.send({token});
        })
    })
});

router.post('/register', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({
            err: 'Please supply an email address and password'
        });
    }

    bcrypt.hash(password, 8, (err, hash) => {
        User.create({
            email,
            password: hash
        }, (err, user) => {
            if (err) return res.status(400).send(err);

            let token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: 86400});

            res.send({token});
        });
    });
});


module.exports = router;