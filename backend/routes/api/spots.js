const express = require('express');
const { Op } = require('sequelize')
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const {requireAuth } = require('../../utils/auth');
const { check} = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const spotValidationError = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const reviewValidationError = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]


router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    if(page && size){
    if(!page) page = 1
    if(!size) size = 20
    page = parseInt(page);
    size = parseInt(size);
    if(page > 10) page = 10
    if(size > 20) size = 20

    const pagination = {}
    if(page >= 1 && size >= 1){
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }

    if(page <= 0 || size <= 0 || minLat < -90 || maxLat > 90 || minLng < 0 || maxLng > 180 || minPrice < 0 || maxPrice < 0){
        res.status(400)
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "page": "Page must be greater than or equal to 1",
              "size": "Size must be greater than or equal to 1",
              "maxLat": "Maximum latitude is invalid",
              "minLat": "Minimum latitude is invalid",
              "minLng": "Maximum longitude is invalid",
              "maxLng": "Minimum longitude is invalid",
              "minPrice": "Maximum price must be greater than or equal to 0",
              "maxPrice": "Minimum price must be greater than or equal to 0"
            }
          })
    }

    const findSpots = await Spot.findAll({
        include: { model: Review, attributes: []},
        group: ['Spot.id'],
        ...pagination,
        raw: true
    })


    for(let spot of findSpots){
        const spotImage = await SpotImage.findOne({
            attributes: ['url'], where: { preview: true, spotId: spot.id}, raw: true
        })
        if(spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = null
        }
    }

    res.status(200)
    return res.json({
        "Spots": findSpots,
        "page": page,
        "size": size
    })
} else {

    const findAvgReviews = await Spot.findAll({
        include: { model: Review, attributes: [] },
        attributes: {
        include:[[(sequelize.fn("AVG", sequelize.col("stars"))), "avgRating"]]},
        group: ["Spot.id"],
        raw: true
})

    for(let spot of findAvgReviews){
        const spotImage = await SpotImage.findOne({
            attributes: ['url'], where: { preview: true, spotId: spot.id}, raw: true
        })
        if(spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = null
        }

    }
    res.status(200)
    return res.json({
        "Spots": findAvgReviews
    })


}
})


//Get all Spots owned by the Current User
router.get('/current', requireAuth, async(req, res, next) => {
    const { user } = req;

    const allSpots = await Spot.findAll({
        where: { ownerId: user.id},
        include: [{ model: Review, attributes: [] }],
        attributes: { include: [[sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]]},
        group: ['Spot.id'],
        raw: true
    })

    for(let spot of allSpots){
        const spotImage = await SpotImage.findOne({
            attributes: ["url"],
            where: { preview: true, spotId: spot.id },
            raw: true
        })
        if(spotImage) spot.previewImage = spotImage.url
        else spot.previewImage = null
    }
    return res.json({
        Spots: allSpots
    })
})

//Get details of a Spot from an id
router.get('/:spotId', async(req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }


    const spotImages = await SpotImage.findAll({
        where: { spotId: spotId },
        attributes: ["id", "url", "preview"]
    })

    const owner = await User.findByPk(spot.ownerId, {
        attributes: ["id", "firstName", "lastName"]
    })

    const numReview = await Review.count({
        where: { spotId: spotId },
        raw: true
    })

    const averageRating = await Review.findOne({
        attributes: [[sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]],
        where: { spotId: spotId },
        raw: true
    })
    const currentCh = spot.toJSON()
    currentCh.SpotImages = spotImages
    currentCh.numReview = numReview
    currentCh.averageRating = averageRating.averageRating
    currentCh.Onwer = owner
    return res.json(currentCh)
})

//Create a Spot
router.post('/',  requireAuth, async(req, res, next) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId: user.id
    })
    if(!address.length || !city.length || !state.length || !country.length || lat < -90 || lat > 90 || lng < -180 || lng > 180 || name.length > 50 || !name.length || !description.length || price < 0){
        return res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }
    res.status(201)
    return res.json(newSpot)
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const { url, preview } = req.body
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const newImage = await SpotImage.create({
        url, preview, spotId: spot.id
    })
    res.status(200)
    return res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview })
})

//Edit a Spot
router.put('/:spotId', spotValidationError, requireAuth, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const userId = req.user.id
    const { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId);

    if(!address.length || !city.length || !state.length || !country.length || lat < -90 || lat > 90 || lng < -180 || lng > 180 || name.length > 50 || !name.length || !description.length || price < 0){
        return res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }

    if(!findSpot) {
        res.status(404)
        return res.send({
            'message': "Spot couldn't be found",
            'statusCode': 404
        })
    }

    if(findSpot.toJSON().ownerId == userId){
        findSpot.update({ address, city, state, country, lat, lng, name, description, price })
        return res.json(findSpot)
    }else {
        res.status(403)
        return res.json({
            'message': 'User not authorized',
            'statusCode': 403
        })
    }
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params
    const spotExists = await Spot.findByPk(spotId);
    if(!spotExists){
        res.status(404)
        return res.json({
            'message': "Spot couldn't be found",
            'statusCode': 404
        })
    }
    await spotExists.destroy();
    res.status(200)
    return res.json({
        'message':"Successfully deleted",
        'statusCode': 200
    })
})

//Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;
    const spotExists = await Spot.findByPk(spotId);
    if(!spotExists){
        res.status(404)
        return res.json({
            'message': "Spot couldn't be found",
            'statusCode': 404
        })
    }
    const reviewSpot = await Review.findAll({
        where: { spotId: spotExists.id },
        include : [
            { model: User, attributes: ['id', 'firstName', 'lastName']},
            { model: ReviewImage, attributes: ['id', 'url']}
        ]
    })
    return res.json({ 'Reviews': reviewSpot })
})

//Not working
//create a review for a spot based on the spot's id -- not working yet
router.post('/:spotId/reviews', reviewValidationError, requireAuth, async (req, res, next) => {
    const { user } = req
    const { review, stars } = req.body
    const { spotId } = req.params
    const userId = req.user.dataValues.id
    const findSpot = await Spot.findByPk(spotId)

    const reviews = await Review.findAll({
        include: [{ model: Spot, where: { id: spotId }}]
    })
    if(stars < 0 || stars > 5 ){
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "review": "Review text is required",
              "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

    if(reviews.length > 0){
        res.status(403)
        return res.json({
            'message': 'User already has a review for this spot',
            'statusCode': 403
        })
    }

    if(!findSpot){
        res.status(404);
        return res.json({
            'message': "Spot couldn't be found",
            'statusCode': 404
        })
    }

    const newReview = await Review.create({
        userId, spotId, review, stars
    })

    res.status(201)
    return res.json(newReview)

})


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const findSpot = await Spot.findByPk(spotId)
    const getBookings = await Booking.findAll({
        where: { spotId },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName']}]
    })

     if (!findSpot){
        res.status(404)
        return res.json({
            'message': "Spot couldn't be found",
            'statusCode': 404
     })
    }
    if(findSpot){
        res.status(200)
        res.json({
            "Bookings":getBookings
        })
    }
})


//Create a Booking from a Spot based on the Spot's id      not working yet
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const { spotId } = req.params
    const userId = req.user.id

    const findSpot = await Spot.findByPk(spotId)

    if(!findSpot){
        res.status(404)
        return res.json({
            'message': "Spot couldn't be found",
            'statusCode': 404
        })
    }

    const getBookings = await Booking.findAll({
        where: { spotId: spotId, startDate: {[Op.lte]: endDate}, endDate: {[Op.gte]: startDate}}
    })

    if(getBookings.length > 0){
        res.status(403)
        return res.json({
            'message': "Sorry, this spot is already booked for the specified dates",
            'statusCode': 403,
            'errors': {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }

    const createBooking = await Booking.create({
        spotId, userId, startDate, endDate
    })

    res.status(200);
    res.json(createBooking)

})


module.exports = router;
