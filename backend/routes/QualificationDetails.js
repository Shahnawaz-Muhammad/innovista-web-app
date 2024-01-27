import express from "express";
import User from "../models/User.js";
const router = express.Router();


const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0); 
router.get('/qualification-count', async (req, res) => {
  try {
   
    const Matric = await User.countDocuments({ qualification: 'matric' });
    const FSc = await User.countDocuments({ qualification: 'intermediate' });
    const BS = await User.countDocuments({ qualification: 'bachelors' });
    const MS = await User.countDocuments({ qualification: 'masters' });
    const Phd = await User.countDocuments({ qualification: 'phd' });
   
    const totalQualify= await User.countDocuments({ category: 'Freelancer' });

    res.status(200).json({
       // totalQualify,
        Matric,
        FSc, 
        BS,
        MS,
        Phd


    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;