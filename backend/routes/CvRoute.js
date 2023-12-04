import express from "express";
import User from "../models/User.js";
import Cv from "../models/Cv.js";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join,extname } from 'path';
const router = express.Router();

// route for cv post cv through Email 
const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);


router.post('/uploadCV', upload.single('cv'), async (req, res) => {
    try {
      const { userEmail } = req.query;
      const folderPath = join(__dirname, '../media'); // Adjust the path as needed
  
      // Check if the email exists in the Signup table
      const existingUser = await User.findOne({ emailAddress: userEmail });
  
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
  
      const originalFileName = req.file.originalname;
      const filePath = join(folderPath, originalFileName);
      fs.writeFileSync(filePath, req.file.buffer);
  
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found. Please sign up first.' });
      }
  
      // Check if there is an existing UserCv document for the user
      const existingUserCv = await Cv.findOne({ Email: userEmail });
  
      if (!existingUserCv) {
        const newUserCv = new Cv({
          Email: existingUser.emailAddress,
          CvContent: req.file.buffer,
          CvFilePath: filePath,
        });
  
        // Save the instance to the database
        await newUserCv.save();
  
        res.status(200).json({ message: 'CV added successfully' });
      } else {
        // Update the existing UserCv document
        existingUserCv.CvContent = req.file.buffer;
        existingUserCv.CvFilePath = filePath; // Corrected this line
  
        // Save the updated instance to the database
        await existingUserCv.save();
  
        res.status(200).json({ message: 'CV updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //route for get cv request 
  router.get('/getCv', async (req, res) => {
    try {
      const { userEmail } = req.query;
  
   
      // Find the CV for the specified user
      const userCv = await Cv.findOne({ Email: userEmail });
  
      if (!userCv) {
        return res.status(404).json({ error: 'CV not found for the specified user.' });
      }
  
      // Assuming you want to send the CV content in the response
      res.status(200).json({
        message: 'CV fetched successfully',
        FilePath:userCv.CvFilePath,
        cvContent: userCv.CvContent.toString('base64'),
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

export default router;
