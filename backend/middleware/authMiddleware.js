import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Senior } from '../models/seniorModel.js';
import { Advisor } from '../models/advisorModel.js';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from "passport-local";

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

const passportInit = async (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      const senior = await Senior.findOne({ email });
      const advisor = await Advisor.findOne({ email });
      const user = senior || advisor;
      if (user == null) {
        return done(null, false);
      }
      const same = await bcrypt.compare(password, user.password);
      if (!same) {
        const hashedP = await bcrypt.hash(password, 12);
        console.log(hashedP, user.password);
        return done(null, false);
      }
      else {
        console.log('found user in authenticateUser function in authMiddleware.js');
        return done(null, user);
      }
    } catch (error) {
      console.error('There was an error with passport');
      return done(error);
    }


  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    // return done(null, getUserById(id))
    try {
      const senior = await Senior.findById(id);
      const advisor = await Advisor.findById(id);
      const user = senior || advisor;
      done(null, user);
    } catch (err) {
      done(err)
    }

  });
}

export { protectRoute, passportInit };