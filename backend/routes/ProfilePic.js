import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises'; // Import the fs module for file operations
import User from '../models/User.js';
import Profile from '../models/ProfileModel.js';

const router = express.Router();

// Set up multer to store files in the 'profile' directory
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const profileDir = 'profile/';
    await fs.mkdir(profileDir, { recursive: true }); // Create 'profile' directory if it doesn't exist
    cb(null, profileDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  console.log("request file", req.file)
    try {
      const { userEmail } = req.query;
  
      // Find the user by email
      const user = await User.findOne({ emailAddress: userEmail });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }  
  
      // Save the relative path in the database
  
      const existingProfile = await Profile.findOne({ Email: userEmail });
  
      if (!existingProfile) {
        const imagePath = path.join('profile', req.file.filename);
  
        const newProfile = new Profile({
          profilePicture: imagePath,
          Email: user.emailAddress,
        });
  
        await newProfile.save();
  
        res.json({ message: 'Profile picture added successfully.' });
      } else {
        // If the profile already exists, update the profile picture
        const imagePath = path.join('profile', req.file.filename);
  
        await Profile.updateOne({ Email: userEmail }, { $set: { profilePicture: imagePath } });
  
        res.json({ message: 'Profile picture updated successfully.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// GET request to retrieve the profile picture by user email
router.get('/getProfilePicture', async (req, res) => {
    try {
      const { userEmail } = req.query;
  
      // Find the profile by user email
      const profile = await Profile.findOne({ Email: userEmail });
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found.' });
      }
  
      // Return the profile picture URL
      const imageURL = `/${profile.profilePicture}`;
      res.json({ imageURL });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default router;
