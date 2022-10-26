const express = require('express');

const { Spot, Review, SpotImage } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')

const router = express.Router();

//get all spots
//needs previewImage
router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll({
        include:[
            // {model:Review, attributes: [sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']},
            // {model: SpotImage, where: {preview: true}, attributes: ['url', {as: 'previewImage'}]}

    ]})
    return res.json(spots)
})

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async(req, res, next) => {
    res.send('hihihi')
})

//Get details of a Spot from an id
router.get('/:spotId', async(req, res, next) => {
    res.send('hellohello')
})

//Create a Spot
router.post('/', requireAuth, async(req, res, next) => {
    res.send('heyyyyy')
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    res.send('hhasd;fkja')
})

//Edit a Spot
router.put('/spotId', requireAuth, async(req, res, next) => {
    res.send('asdlfkja')
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    res.send('dkkdkds')
})

//Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    res.send('asdl;kfjasa;sdlkfj')
})

//create a review for a spot based on the spot's id -- not working yet
router.post('/spotId/reviews', requireAuth, async (req, res, next) => {
    const spotId = req.params.id
    const { review, stars } = req.body

    const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    })

    return res.json(newReview)
})

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    res.send('as;dlkfja')
})


//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    res.send('asd;lkfj')
})

module.exports = router;
