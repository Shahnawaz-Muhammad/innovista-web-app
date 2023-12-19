import express from "express";
import User from "../models/User.js";
const router = express.Router();


const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0); 
router.get('/BarChart', async (req, res) => {
  try {
   
    const metricCount = await User.countDocuments({ qualification: 'matric' });
    const fscCount = await User.countDocuments({ qualification: 'intermediate' });
    const BsCount = await User.countDocuments({ qualification: 'bachelors' });
    const MsCount = await User.countDocuments({ qualification: 'masters' });
    const PhdCount = await User.countDocuments({ qualification: 'phd' });
   
    const totalQualify= await User.countDocuments({ category: 'Freelancer' });

    res.status(200).json({
        totalQualify,
        metricCount,
        fscCount, 
        BsCount,
        MsCount,
        PhdCount


    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;