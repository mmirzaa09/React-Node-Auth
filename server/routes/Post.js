const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');

const { validateToken } = require('../middlewares/AuthMidleWare')

router.get('/', validateToken, async (req, res) => {
    const listOfPost = await Posts.findAll({ include: [Likes]});
    const likedPost = await Likes.findAll({ where: {  UserId: req.user.id} })
    res.json({listOfPost: listOfPost, likedPost: likedPost});
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post);
})

router.post('/', async (req, res) => {
    const post = req.body
    await Posts.create(post);
    res.json(post);
});

module.exports = router;