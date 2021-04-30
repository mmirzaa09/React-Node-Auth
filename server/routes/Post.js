const express = require('express');
const { request } = require('express');
const router = express.Router();
const { Posts } = require('../models')

router.get('/', async (req, res) => {
    const lisOfPost = await Posts.findAll();
    
    res.json(lisOfPost);
});

router.post('/', async (req, res) => {
    const post = req.body
    await Posts.create(post);
    res.json(post);
});

module.exports = router;