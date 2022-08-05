const express = require('express');
const user1 = require('../models/user');
const router = express.Router();

//Create a user using POST : /api/auth
router.post('/', (req, res) => {
    const user = user1(req.body);
    user.save();
    res.send(req.body)
})

module.exports = router