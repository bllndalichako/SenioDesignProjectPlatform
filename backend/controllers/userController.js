import asyncHandler from 'express-async-handler'; // Allows us to handle errors in async functions w/o try/catch blocks.
import { Senior } from '../models/seniorModel.js';
import { Advisor } from '../models/advisorModel.js';
import { Register } from '../models/registeredUserModel.js';
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer';

// @desc    Register new user.
// route   POST /register/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, accessType } = req.body;

    const verificationCode = Math.floor(Math.random() * 1000000);

    const alreadyRegistered = await Register.findOne({ email: email });

    if (alreadyRegistered) {
      alreadyRegistered.verification = verificationCode;
      await alreadyRegistered.save();
    } else {
      const newRegistration = new Register(
        {
          email: email,
          verification: verificationCode
        }
      );
      await newRegistration.save();
    }

    const transporter = nodemailer.createTransport(
      {
        service: 'Gmail',
        auth: {
          user: 'seniordesignprojectplatform@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }

      }
    );

    const mailOptions = {
      from: 'seniordesignprojectplatform@gmail.com',
      to: email,
      subject: 'Verification Code for Senior Design Project Platform',
      text: `Your verification code is ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      // console.log("In transporter.sendMail")
      if (error) {
        console.error(error);
        res.status(500).send('Failed to send verification email')
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Verification email sent');
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

const verifyRegistration = asyncHandler(async (req, res) => {

  try {

    const { firstName, lastName, email, password, accessType } = req.body;
    const { verificationCode } = req.params;

    console.log(firstName, lastName, email, password, accessType)

    const registeredUser = await Register.findOne({ email: email });

    if (registeredUser) {
      if (registeredUser.verification === verificationCode) {

        // Create user.
        const verifiedStudent = await Senior.findOne({ email: email });
        const verifiedAdvisor = await Advisor.findOne({ email: email });

        if (verifiedStudent || verifiedAdvisor) {
          res.status(100).json({ message: "User already registered. Login instead." });
          console.log("User already registered. Login instead.");
          return;
        }

        const user = accessType === "student" ? await Senior.create({ firstName, lastName, email, password }) : await Advisor.create({ firstName, lastName, email, password });

        console.log(user);
        res.status(200).json({ message: "User successfully verified." });
      } else {
        res.status(400).json({ message: "User verification failed." });
      }
    }
    else {
      res.status(400).send({ message: "User not registered." });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// @desc    Auth user & set token in cookie when user logs in.
// route   POST /register/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, accessType } = req.body;

  // Check if user exists.
  const user = accessType === "student" ? await Senior.findOne({ email }) : await Advisor.findOne({ email });

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

export { authUser, registerUser, logoutUser, getUserProfile, verifyRegistration };