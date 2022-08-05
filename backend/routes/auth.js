const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        name : 'Anshika',
        gender : 'female'
    }
    res.json(obj)
})

module.exports = router