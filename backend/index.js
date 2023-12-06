import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import signupRouter from './routes/Route.js';
import ExperienceRoutes from './routes/ExperienceRoute.js';
import BookingRoutes from './routes/BookingRoute.js';
import JobRoutes from './routes/JobRoute.js';
import CvRoutes from './routes/CvRoute.js';
// import EmailRoute from './routes/EmailRoute.js';
import DifferenceCategory from './routes/DifferenceCategory.js'
import ActiveFreelancer from './routes/ActiveFreelancer.js'
import ActiveGroup from './routes/ActiveGroup.js';
import ActiveCompany from './routes/ActiveCompany.js' 
import BookingRecords from './routes/BookingRecords.js'
import RegisterRecords from './routes/RegisterationRecords.js'
import ProfilePic from './routes/ProfilePic.js'
import { PORT, mongoDBURL } from './config.js';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';
const app = express();



// const __filename = fileURLToPath(import.meta.url);
// const _dirname = dirname(_filename);

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Use the signup router

app.use('/api', signupRouter);
app.use('/api', ExperienceRoutes);
app.use('/api', BookingRoutes);
app.use('/api', JobRoutes);
app.use('/api', CvRoutes);
// app.use('/api', EmailRoute);
app.use('/api', DifferenceCategory);
app.use('/api', ActiveFreelancer);
app.use('/api', ActiveGroup);
app.use('/api', ActiveCompany);
app.use('/api', BookingRecords);
app.use('/api', RegisterRecords);
app.use('/api', ProfilePic);
app.use('/api/profile', express.static('profile'));
app.use('/api/cv', express.static('cv'));


// MongoDB connection
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });