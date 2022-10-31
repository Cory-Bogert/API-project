const express = require('express');
const { Spot, Review, SpotImage, Booking, ReviewImage, User } = require('../../db/models');
const sequelize = require('sequelize')
const {setTokenCookie, requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const router = express.Router();

// const bookingsValidationError = [
//     check('startDate')
//         .exists({ checkFalsy: true })
//         .withMessage('startDate cannot come before startDate'),
//     check('endDate')
//         .exists({ checkFalsy: true })
//         .withMessage('endDate cannot come before startDate'),
//         handleValidationErrors
// ];

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
    const { user } = req;
    const currentBooking = await Booking.findAll({
        where: { userId: user.id },
        include: [
            { model: Spot, attributes:[ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
              include:{ model: SpotImage, where:{ preview: true }}
            }
        ]
    })
    let bookArr = [];
    for(let i = 0; i < currentBooking.length; i++){
        bookArr.push(currentBooking[i].toJSON())
    }

    bookArr.forEach(bookings => {
        bookings.Spot.SpotImages.forEach(spotImage => {
            if(spotImage.preview === true) bookings.Spot.previewImage = spotImage.url
        })

        delete bookings.Spot.SpotImages
    })

    // console.log(bookArr)
    // for(let i = 0; i < bookArr.length; i++){
    //     // console.log(bookArr[i].Spot.SpotImages)
    //     let spotImage = bookArr[i].Spot.SpotImages
    //     for(let j = 0; j < spotImage.length; i++){
    //         // console.log(spotImage)
    //         if(spotImage.preview === true){
    //             spotImage = spotImage.url
    //         }
    //     }
    // }
    // delete spotImage

    // bookArr.forEach(booking => {
    //     booking.Spot.SpotImages.forEach(spotImage => {

    //       if(spotImage.preview === true){
    //         booking.Spot.previewImage = spotImage.url
    //       }

    //     })


    //     delete booking.Spot.SpotImages

    //   });
    //   return res.json({
    //     "Bookings": bookArr
    // })
    return res.json({
        "Bookings": bookArr
    })
})

//Edit a Booking
router.put('/:bookingId',  requireAuth, async(req, res, next) => {
    const { bookingId } = req.params
    const { startDate, endDate } = req.body
    const { user } = req;
    const getBooking = await Booking.findByPk(bookingId)
    // console.log(getBooking)
    if(!getBooking){
        res.status(404)
        return res.json({
            'message': "Booking couldn't be found",
            'statusCode': 404
        })
    }

    if(new Date(endDate).getTime() <= new Date().getTime()){
        res.status(403);
        return res.json({
            'message': "Past bookings can't be modified",
            'statusCode': 403
        })
    }

    if(new Date(startDate).getTime() >= new Date(endDate).getTime()){
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
        })
    }
    const getBookings = await Booking.findAll({
        where: {
            spotId: getBooking.spotId,
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: startDate }
         }
    })
    // console.log('bookingssssss', getBookings)
    if(getBooking.userId === user.id){
        getBooking.startDate = startDate
        getBooking.endDate = endDate
        await getBooking.save()
        res.status(200)
        return res.json(getBooking)
    }


})

//Delete a Booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const { bookingId } = req.params
    const bookingExists = await Booking.findByPk(bookingId)
    if(!bookingExists){
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    const startedBooking = new Date(bookingExists.startDate)
    if(startedBooking < new Date()){
        res.status(403)
        return res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }

    await bookingExists.destroy()
    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})



module.exports = router;
