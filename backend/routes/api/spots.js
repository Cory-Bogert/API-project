const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');

// const router = require("./spots");


router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    return res.json(spots)
})

module.exports = router;
