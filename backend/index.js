import express, { request } from 'express';
import { PORT, MONGODB_URL } from './config.js';
import { Senior } from './models/seniorModel.js';
import registerRoute from './routes/registerRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, routeNotFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// Middleware for parsing request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// TODO: Change to project's domain
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET, POST, PUT, DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for enabling CORS.
app.use(cors());

// Middleware for handling errors.
// TODO: Figure out why this isn't working.
// app.use(routeNotFound);
// app.use(errorHandler);

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Connected to server and displaying root route.');
});

app.use('/api/register', registerRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
