// backend/routes/api/session.js
const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Log in
router.post(
    '/',
    // validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if(!credential.length || !password.length){
        return res.status(400).json({
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
            "credential": "Email or username is required",
            "password": "Password is required"
          }
      })
      }


      if (!user) {
        // const err = new Error('Invalid credentials');
        // err.status = 401;
        // err.title = 'Login failed';
        // err.errors = ['The provided credentials were invalid.'];
        // return next(err);
        res.status(401);
        return res.json({
          "message": "Authentication required",
          "statusCode": 401
        })
      }

      // await setTokenCookie(res, user);

      // return res.json({
      //   user

      const token = setTokenCookie(res, user)
      const currentUser = user.toJSON()
      return res.json({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        token
      })
     });


  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
    '/',
    restoreUser,
   async (req, res) => {
      const user = req.user
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json(null);
    }
  );



module.exports = router;
