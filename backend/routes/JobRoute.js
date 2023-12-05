import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";

const router = express.Router();

// route for Job post data
router.post("/PostJob", async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await User.findOne({ emailAddress: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newJobPost = new Job({
      job_title: req.body.job_title,
      salary: req.body.salary,
      company: req.body.company,
      description: req.body.description,
      job_category: req.body.job_category,
      job_type: req.body.job_type,
      job_experience: req.body.job_experience,
      job_vacancy: req.body.job_vacancy,
      job_deadline: req.body.job_deadline,
      status: req.body.status,
      Email: user.emailAddress,
    });

    const savedJobPost = await newJobPost.save();

    res.status(201).json(savedJobPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/GetJobPost", async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await Job.find({ Email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/UpdateJobPost/:JobPostId", async (req, res) => {
  try {
    const { JobPostId } = req.params;

    const updatedJobPost = await Job.findByIdAndUpdate(
      JobPostId,
      {
        $set: {
          job_title: req.body.job_title,
          salary: req.body.salary,
          company: req.body.company,
          description: req.body.description,
          job_category: req.body.job_category,
          job_type: req.body.job_type,
          job_experience: req.body.job_experience,
          job_vacancy: req.body.job_vacancy,
          job_deadline: req.body.job_deadline,
          status: req.body.status,
        },
      },
      { new: true }
    );

    if (!updatedJobPost) {
      return res.status(404).json({ error: "JobPost record not found" });
    }

    res.status(200).json({
      message: "JobPost record updated successfully",
      updatedJobPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteJobPost/:JobPostId", async (req, res) => {
  try {
    const { JobPostId } = req.params;

    // Find and delete the specific Job Post record by ID
    const deletedJobPost = await Job.findByIdAndDelete(JobPostId);

    if (!deletedJobPost) {
      return res.status(404).json({ error: "Job Post record not found" });
    }

    res.status(200).json({ message: "Job Post record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/ShowJobByStatus/:status", async (req, res) => {
    try {
      const { status } = req.params;
  
      const query = { status: status };
  
      // Find jobs based on the query
      const jobs = await Job.find(query);
  
  
      if (!jobs) {
        return res.status(404).json({ error: "Jobs not found" });
      }
  
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

export default router;
