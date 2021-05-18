const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMidleWare')

const { sign } = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash
        });
         res.json("Success");
    })
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: {username: username}});

    if(!user) res.json({error: "User Doesnt Exist"});

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({error: "wrong username and password combination"});

        const accessToken = sign({username: user.username, id: user.id}, "importantsecrete")
        res.json(accessToken);
    })

});

router.get('/auth', validateToken, (req, res) => {
     res.json(req.user);
});

module.exports = router;