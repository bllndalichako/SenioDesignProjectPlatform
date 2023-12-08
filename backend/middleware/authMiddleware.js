import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Senior } from '../models/seniorModel.js';
import { Advisor } from '../models/advisorModel.js';

// Calling next because this is a middleware function.
const protectRoute = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      
      // Verify token.
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token. Removing password from user object.
      const user = decodedToken.user.accessType === "student" ? await Senior.findById(decodedToken.user._id).select('-password') : await Advisor.findById(decodedToken.user._id).select('-password');

      // If user exists, set req.user to user.
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).send({ message: 'Unauthorized user. User not found.' });
      }

    } catch (error) {
      res.status(401).send({ message: 'Unauthorized user. Invalid token.' });
    }
  } else {
    res.status(401).send({ message: 'Unauthorized user. User has no token.' });
  }

});

export { protectRoute };