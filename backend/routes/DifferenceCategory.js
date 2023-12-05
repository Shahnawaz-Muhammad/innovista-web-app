import express from "express";
import User from "../models/User.js";

const router = express.Router();


router.get('/CategoryCount', async (req, res) => {
    try {
      // Count the total number of documents in the "signup" collection
      const totalRecords = await User.countDocuments();
  
      // Count the number of freelancers
      const freelancerCount = await User.countDocuments({ category: 'Freelancer' });
  
      // Count the number of groups
      const groupCount = await User.countDocuments({ category: 'Group' });
  
      // Count the number of companies
      const companyCount = await User.countDocuments({ category: 'Company' }); 
  
      res.status(200).json({
        totalRecords,
        freelancerCount,
        groupCount,
        companyCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
export default router;
