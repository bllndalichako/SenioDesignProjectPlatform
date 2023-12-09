import express, { request } from 'express';
import { PORT, MONGODB_URL } from './config.js';
import { Senior } from './models/seniorModel.js';
import registerRoute from './routes/registerRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, routeNotFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import { passportInit } from './middleware/authMiddleware.js';
import { Advisor } from './models/advisorModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();

const MongoDBStore = connectMongoDBSession(expressSession);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions',
});

store.on('error', function (error) {
  console.error(error)
});

// Middleware for parsing request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// TODO: Change to project's domain
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',
  // methods: ['GET, POST, PUT, DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(
  expressSession({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000
    },
  })
);

// Middleware for enabling CORS.
// app.use(cors());
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Connected to server and displaying root route.');
});

app.use('/api/register', registerRoute);

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful' });
});

app.get('/api/auth', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(`/api/auth called:`);
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false, user: null });
  }
})

app.post('/api/forgot-password', async (req, res) => {
  try {
    console.log("In forgot password route");
    const { email } = req.body;
    const advisor = await Advisor.findOne({ email });
    const student = await Senior.findOne({ email });
    const user = advisor || student;

    if (!user) {
      return res.status(404).send({ message: 'Email address does not exist.' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '20m' });

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
      subject: 'Reset Password Link',
      text: `Click on this link to reset your password: http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error sending email.' });
      } else {
        console.log('Email sent: ' + response.response);
        return res.status(200).send({ message: 'Password reset email sent.' });
      }
    });

    console.log(req.body);
    res.status(200).json({ message: 'Password reset email sent.' });

  } catch (error) {
    console.log(error.message);
  }
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
