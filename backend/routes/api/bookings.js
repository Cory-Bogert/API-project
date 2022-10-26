const express = require('express');

const { Spot, Review, SpotImage, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
    res.send('a;lsdkfja;sld')
})

//Edit a Booking
router.put('/:bookingId', requireAuth, async(req, res, next) => {
    res.send('asd;lfkj')
})

//Delete a Booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    res.send('alds;kfj')
})



module.exports = router;
