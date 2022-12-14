const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;

      const validateEmail = await User.findOne({
        where: { email: email }
      })
      if(!firstName.length || !lastName.length || !username.length){
        return res.status(400).json({
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
            "email": "Invalid email",
            "username": "Username is required",
            "firstName": "First Name is required",
            "lastName": "Last Name is required"
          }
      })
      }

      if (validateEmail){
        res.status(403)
        return res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }

      const validateUser = await User.findOne({
        where: { username: username }
      })

      if(validateUser){
        res.status(403)
        return res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
      }

      const user = await User.signup({ firstName, lastName, username, email, password})
      user.toJSON()
      const token = await setTokenCookie(res, user);
      user.token = token


      return res.json({
        'id': user.id,
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'token': token
      });
    }
  );







module.exports = router;
