const express = require('express');

const { Spot, Review, SpotImage, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    res.send('asd;lkf')
})






module.exports = router;
