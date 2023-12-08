import asyncHandler from 'express-async-handler'; // Allows us to handle errors in async functions w/o try/catch blocks.
import { Senior } from '../models/seniorModel.js';
import { Advisor } from '../models/advisorModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user.
// route   POST /register/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, accessType } = req.body;

  // Check if user already exists.
  const userExists = accessType === "senior" ? await Senior.findOne({ email }) : await Advisor.findOne({ email });

  if (userExists) {
    res.status(400).send({ message: "User already exists." });
    // throw new Error('User already exists.');
  }

  // Create user.
  const user = accessType === "senior" ? await Senior.create({ firstName, lastName, email, password }) : await Advisor.create({ firstName, lastName, email, password });

  // Confirm user was created, and return created user.
  if (user) {
    generateToken(res, user);

    res.status(201).json(user).send({ message: "User successfully registered." });
  } else {
    res.status(400).send({ message: "User was not registered." });
    // throw new Error('User not created. Invalid user data.');
  }
});

// @desc    Auth user & set token in cookie when user logs in.
// route   POST /register/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, accessType } = req.body;

  // Check if user exists.
  const user = accessType === "senior" ? await Senior.findOne({ email }) : await Advisor.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user);

    res.status(200).json(user).send({ message: "User successfully authenticated && logged in." });
  } else {
    res.status(401).send({ message: "Invalid email or password." });
    // throw new Error('Invalid email or password.');
  }
});

// @desc Logout user.
// route   POST /register/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  // Clear cookie.
  res.cookie('jwt', '', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send({ message: "User successfully logged out." });
});

// @desc    Get user profile.
// route   GET /register/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Get user from token.
  const user = req.user;

  // If user exists, set req.user to user.
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: 'User not found.' });
  }
});

export { authUser, registerUser, logoutUser, getUserProfile };