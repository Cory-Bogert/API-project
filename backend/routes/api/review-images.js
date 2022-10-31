const express = require('express');

const { Spot, Review, SpotImage, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')

const router = express.Router();

//Delete a review image
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { imageId } = req.params
    const imageExists = await ReviewImage.findByPk(imageId)
    if(!imageExists){
        res.status(404)
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    await imageExists.destroy()
    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})



module.exports = router;
