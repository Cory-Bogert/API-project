const express = require('express');

const { Spot, Review, SpotImage, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')

const router = express.Router();

//get all reviews of the current user
router.get('/', requireAuth, async (req, res, next) => {
    // let allReviews = await Review.findAll()
    //     return res.json(allReviews)
res.send('hasdfhasdf')
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images',  async (req, res, next) => {
    res.send('adsl;jasd;f')
})

//Edit a Review
router.put('/:reviewId', async (req, res, next) => {
    res.send('adslfkjasd')
})

//Delete a Review
router.delete('/:reviewId', async (req, res, next) => {
    res.send('ads;lkfjasd')
})


module.exports = router;
