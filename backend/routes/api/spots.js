const express = require('express');
const { Op } = require('sequelize')
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
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
//get all spots
//needs previewImage
// router.get('/', async (req, res, next) => {
//     let allSpots = await Spot.findAll({
//         include:[
//             // {model:Review, attributes: [sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']},
//             // {model: SpotImage, where: {preview: true}, attributes: ['url', 'previewImage']},
//             {model: Review, as: 'Reviews', attributes:[]}
// ],
// attributes:{include: [[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']]
// },
// group:['Spot.id'] })
//     return res.json(allSpots)
// })

// router.get('/', async (req,res)=>{
//     const spots = await Spot.findAll({
//     include:[{
//             model:Review,
//             as:'Reviews',
//             attributes:[],
//         },
//         {
//             model: SpotImage,
//             as: 'SpotImages',
//             attributes: [],
//         }
//     ],
//     attributes:{
//         include:
//             [
//                 [
//                     sequelize.fn('AVG', sequelize.col('Reviews.stars')),'avgRating'
//                 ],
// // {
// //                     model: SpotImage,
// //                     attributes: ['url']
// // }
//             ]
//     },
//     group:['Spot.id']
//     })
//     // console.log("spots",spots)
//     res.json({spots})
// })


//Get all spots
// router.get('/', async (req, res, next) => {
//     const pagination = {}
//     let {page, size } = req.query;
//     page = parseInt(page)
//     size = parseInt(size)

//     if(!page) page = 1
//     if(!size) size = 20

//     if(page >= 1 && size >= 1){
//         pagination.limit = size;
//         pagination.offset = size * (page - 1);
//     }

//     const allSpots = await Spot.findAll({
//     ...pagination
// });

//     for(let spot of allSpots){
//         const findImage = await SpotImage.findOne({
//             attributes: ['url'],
//             where: {
//                 preview: true,
//                 spotId: spot.id
//             },
//             raw: true,
//         })

//         if(findImage) spot.previewImage = findImage.url
//         else spot.previewImage = null

//         const findReview = await Spot.getReviews({
//             attributes: [
//                 [sequelize.fn("AVG", sequelize.col('stars')), 'avgRating']
//             ]
//         })

//         const avg = findReview[0].dataValues.avgRating
//         const avgRes = Number(avg).toFixed(2)

//         if(findReview) spot.dataValues.avgRating = avgRes
//         else spot.dataValues.avgRating = "";
//     }
//     res.status(200);
//     res.json({
//         'Spots':allSpots,
//         'page': page,
//         'size': size
//     })
// })
// router.get('/', async (req, res, next) => {
//     const spots = await Spot.findAll({
//         include: [
//             { model: SpotImage, as: 'SpotImages', attributes: [] },
//             { model: Review, as: 'Reviews', attributes: [] }
//         ],
//         attributes: {
//             include: [
//                 {model:Review, attributes: [sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']},
//                 {model: SpotImage, attributes: ['url', 'previewImage']},
//             ]
//         },
//         group: ['Spot.id']
//     })
//     res.json({ spots })
// })

router.get('/', async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    //set default values
    if (page && size) {
        if (!page) page = 1;
        if (!size) size = 20;
        page = parseInt(page);
        size = parseInt(size);

        const pagination = {}
        if (page >= 1 && size >= 1) {
            pagination.limit = size;
            pagination.offset = size * (page - 1)
        }
        if (page <= 0 && size <= 0) {
            res.status(400);
            return res.json({
                "page": "Page must be greater than or equal to 0",
                "size": "Size must be greater than or equal to 0",
            })
        }
        const spotsall = await Spot.findAll({
            include: {
                model: Review,
                attributes: []
            },

            group: ["Spot.id"],
            ...pagination, // need this to return ALL spots
            raw: true,
            subQuery: false

        })
        // go through spots array and see if each obj has an assoc image
        for (let spot of spotsall) {
            const spotImage = await SpotImage.findOne({
                attributes: ["url"],
                where: {
                    preview: true,
                    spotId: spot.id
                },
                raw: true
            })
            // if image exists, then set spotImage property in obj accordingly
            if (spotImage) {
                spot.previewImage = spotImage.url
            } else {
                spot.previewImage = null
            }
        }
        return res.json({
            Spots: spotsall, "page": page, "size": size
        })
    }
    else {
        const spotsall = await Spot.findAll({
            include: {
                model: Review,
                attributes: []
            },
            attributes: {
                include: [
                    [
                        sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 2), "avgRating"
                    ]
                ]
            },

            group: ["Spot.id"],
            // ...pagination, // need this to return ALL spots
            raw: true,
            //   subQuery: false

        })
        // go through spots array and see if each obj has an assoc image
        for (let spot of spotsall) {
            const spotImage = await SpotImage.findOne({
                attributes: ["url"],
                where: {
                    preview: true,
                    spotId: spot.id
                },
                raw: true
            })
            // if image exists, then set spotImage property in obj accordingly
            if (spotImage) {
                spot.previewImage = spotImage.url
            } else {
                spot.previewImage = null
            }
        }
        return res.json({
            Spots: spotsall
        })
    }
})


//Get all Spots owned by the Current User
router.get('/current', requireAuth, async(req, res, next) => {
    const { user } = req;

    const allSpots = await Spot.findAll({
        where: { ownerId: user.id},
        include: [{
            model: Review,
            attributes: []
        }],
        attributes: {
            include: [[sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]]
        },
        group: ['Spot.id'],
        raw: true
    })

    for(let spot of allSpots){
        const spotImage = await SpotImage.findOne({
            attributes: ["url"],
            where: {
                preview: true,
                spotId: spot.id
            },
            raw: true
        })
        if(spotImage) spot.previewImage = spotImage.url
        else spot.previewImage = null
    }
    return res.json({Spots: allSpots})
})

//Get details of a Spot from an id
router.get('/:spotId', async(req, res, next) => {
    const { spotId } = req.params;
    const spotDetails = await Spot.findByPk(spotId);

    if(!spotDetails) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const owner = await User.findByPk(spotDetails.ownerId, {
        attributes: ["id", "firstName", "lastName"]
    })

    const spotImages = await SpotImage.findAll({
        where: {
            spotId: spotId
        },
        attributes: ["id", "url", "preview"]
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
    const details = spotDetails.toJSON()
    details.numReview = numReview
    details.averageRating = averageRating.averageRating
    details.SpotImages = spotImages
    details.Onwer = owner
    return res.json(details)
})

//Create a Spot
router.post('/', spotValidationError, requireAuth, async(req, res, next) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId: user.id
    })
    // if(!newSpot){
    //     return res.status(400).json({
    //         "message": "Validation Error",
    //         "statusCode": 400,
    //         "errors": {
    //             "address": "Street address is required",
    //             "city": "City is required",
    //             "state": "State is required",
    //             "country": "Country is required",
    //             "lat": "Latitude is not valid",
    //             "lng": "Longitude is not valid",
    //             "name": "Name must be less than 50 characters",
    //             "description": "Description is required",
    //             "price": "Price per day is required"
    //         }
    //     })
    // }
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
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId);

    if(!findSpot) {
        res.status(404)
        return res.send({
            'message': "Spot couldn't be found",
            'statusCode': 404
        })
    }
    if(user.id === findSpot.ownerId){
        findSpot.address = address;
        findSpot.city = city;
        findSpot.state = state;
        findSpot.country = country;
        findSpot.lat = lat;
        findSpot.lng = lng;
        findSpot.name = name;
        findSpot.description = description;
        findSpot.price = price;
        findSpot.ownerId = user.id;
        await findSpot.save();
        res.status(200)
        return res.json(findSpot)
    } else {
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
        include: [
            { model: Spot,
              where: {
                id: spotId
              }
            }
        ]
    })

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
