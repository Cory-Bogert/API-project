const express = require('express');

const { Spot, Review } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')

const router = express.Router();

//needs avgRating and previewImage
router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll({
        include:{model:Review, required: true},
        attributes:{
            include: [[sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']]
        }
    })
    return res.json(spots)

})

module.exports = router;
