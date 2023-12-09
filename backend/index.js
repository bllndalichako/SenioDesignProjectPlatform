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
      res.status(404).send({ message: 'Email address does not exist.' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

    console.log(req.body);
    res.status(200).json({ message: 'Password reset email sent.', token });

  } catch (error) {
    console.log(error.message);
  }
});

app.post('/api/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).send({ message: 'No token found.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ message: 'Token expired.' });
      }

      const user = await Advisor.findOne({ _id: decodedToken._id }) || await Senior.findOne({ _id: decodedToken._id });

      if (!user) {
        return res.status(404).send({ message: 'User does not exist.' });
      }

      user.password = password;
      await user.save();

      return res.status(200).send({ message: 'Password reset successful.' });
    });

  } catch (error) {
    console.log(error.message);
  }
});

app.post('/api/logout', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      req.logout((err) => console.log(err));
      res.status(200).json({ message: 'User logged out successfully' });
    } else {
      res.status(401).json({ message: 'You are not logged in' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.put('/api/update-profile', async (req, res) => {
  try {
    const { email, accessType, projectIdea, skills, specialization } = req.body;
    if (accessType === 'student') {
      const student = await Senior.findOne({ email });
      student.projectIdea = projectIdea;
      student.skills = skills;
      await student.save();
      console.log(student);
      res.status(200).json({ message: 'Student profile setup successful' });
    } else if (accessType === 'advisor') {
      const advisor = await Advisor.findOne({ email });
      advisor.proposedProject = projectIdea;
      advisor.specialization = specialization;
      await advisor.save();
      console.log(advisor);
      res.status(200).json({ message: 'Advisor profile setup successful' });
    } else {
      res.status(400).json({ message: 'User is neither a student or an advisor.' });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/api/get-advisors', async (req, res) => {
  try {
    const advisors = await Advisor.find({});

    if (!advisors) {
      res.status(404).json({ message: 'No advisors have registered on the platform yet.' });
    } else {
      res.status(200).json({ advisors });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/api/request-advisor', async (req, res) => {
  const { student, advisor } = req.body;

  try {
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
      to: advisor.email,
      subject: 'Senior Design Project: Advisor Request from team ' + student.team.name,
      text: `Team name: ${student.team.name}\n
      Project description: ${student.team.projectDescription}\n
      Team members: ${student.team.members}\n
      Coding languages: ${student.team.codingLanguages}\n
      Tools, packages, and frameworks: ${student.team.toolsPackagesFrameworks}\n\n\n
      Login to the platform to accept or reject the request: http://localhost:5173/login`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      // console.log("In transporter.sendMail")
      if (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to send request'})
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({message: 'Request sent successfully'});
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
