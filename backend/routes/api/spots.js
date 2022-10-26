const express = require('express');

const { Spot, Review, SpotImages } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')

const router = express.Router();

//get all spots
//needs previewImage
router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll({
        include:{model:Review, attributes: []},
        attributes:{
            include: [[sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']]
        }
    })
    return res.json(spots)
})

//Get all Spots owned by the Current User
router.get('/current', requireAuth, (req, res, next) => {
    res.send('hihihi')
})

//Get details of a Spot from an id
router.get('/:spotId', (req, res, next) => {
    res.send('hellohello')
})

//Create a Spot
router.post('/', requireAuth, (req, res, next) => {
    res.send('heyyyyy')
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, (req, res, next) => {
    res.send('hhasd;fkja')
})

router.put('/spotId', requireAuth, (req, res, next) => {
    res.send('asdlfkja')
})

router.delete('/:spotId', requireAuth, (req, res, next) => {
    res.send('dkkdkds')
})

module.exports = router;
