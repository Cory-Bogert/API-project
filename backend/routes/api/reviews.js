const express = require('express');
const { Op } = require('sequelize')
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth');
// const review = require('../../db/models/review');


const router = express.Router();



//get all reviews of the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req
    const getReviews = await Review.findAll({
        where: { userId:user.id },
        include: [
            { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
            { model: User, attributes: ['id', 'firstName', 'lastName']},
            { model: ReviewImage, attributes: ['id', 'url']}
        ],
    })

    let reviewArr = []

    for(let i = 0; i < getReviews.length; i++){
        let reviewObj = getReviews[i].toJSON();
        let previewImg = await SpotImage.findByPk(getReviews[i].id,{
            where:{ preview: true },
            attributes:['url'],
            raw: true
        })

        if(!previewImg) reviewObj.Spot.previewImg = ""
        if(previewImg) reviewObj.Spot.previewImg = previewImg.url
        reviewArr.push(reviewObj)

        // console.log('dthis', previewImg)
        if(previewImg) reviewObj.Spot.previewImg = previewImg.url
        else reviewObj.Spot.previewImg = ''


    }
    // console.log('asd;lfkjasdf',reviewArr)

    return res.json({'Reviews': reviewArr })
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth,  async (req, res, next) => {
    const { url } = req.body
    const { reviewId } = req.params

    const review = await Review.findByPk(reviewId)

    if(!review){
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    const reviews = await ReviewImage.findAll()
    if(reviews.length > 10){
        res.status(403)
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    const newReviewImage = await ReviewImage.create({
        url,
        reviewId: review.id
    })

    res.status(200)
    return res.json({ id: newReviewImage.id, url: newReviewImage.url })

})

//Edit a Review
router.put('/:reviewId',requireAuth, async (req, res, next) => {
    const { reviewId } = req.params
    const { review, stars } = req.body
    const userId = req.user.id
    const findReview = await Review.findByPk(reviewId)
    if(!findReview){
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if(findReview.toJSON().userId === userId){
        if((stars >= 1 && stars <= 5) && (review.length > 0)){
        findReview.review = review;
        findReview.stars = stars
        await findReview.save()
        res.status(200)
        return res.json(findReview)
        } else {
            res.status(400)
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "review": "Review text is required",
                  "stars": "Stars must be an integer from 1 to 5",
                }
            })
        }
    }

})

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params
    const reviewExists = await Review.findByPk(reviewId)
    if(!reviewExists){
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    await reviewExists.destroy();
    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
