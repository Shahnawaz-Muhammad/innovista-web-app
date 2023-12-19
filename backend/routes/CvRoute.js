import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs/promises"; // Import the fs module for file operations
import User from "../models/User.js";
import CV from "../models/Cv.js"; // Assuming you have a CV model

const router = express.Router();

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const _dirname = dirname(_filename);

// Set up multer to store files in the 'cv' directory
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const cvDir = "cv/";
    await fs.mkdir(cvDir, { recursive: true }); // Create 'cv' directory if it doesn't exist
    cb(null, cvDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/uploadCV", upload.single("cvFile"), async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await User.findOne({ emailAddress: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    //const existingCV = await CV.findOne({ Email: userEmail });

    const cvPath = path.join("cv", req.file.filename);

    const newCV = new CV({
      cvFile: cvPath,
      Email: user.emailAddress,
      CompanyEmail: req.body.CompanyEmail,
      JobTitle: req.body.JobTitle,
      Job_id: req.body.Job_id,
    });
    await newCV.save();

    res.json({ message: "CV file added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// GET request to retrieve the CV file by user email
router.get("/getCV/:cvId", async (req, res) => {
  try {
    const { cvId } = req.params;

    // Find the CV by ID
    const cv = await CV.findById(cvId);

    if (!cv) {
      return res.status(404).json({ message: "CV not found." });
    }

    // Return the CV file URL
    const cvURL = `/${cv.cvFile}`;
    const EmailAddress = `${cv.Email}`;

    res.json({ cvURL, EmailAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET request to retrieve the complete list of CVs
router.get("/getAllCVs", async (req, res) => {
  try {
    const { companyEmail } = req.query;

    // Define a filter object based on the presence of companyEmail
    const filter = companyEmail ? { CompanyEmail: companyEmail } : {};

    // Retrieve CVs based on the filter
    const allCvs = await CV.find(filter);

    // Return the list of CVs in the response
    res.json({ allCvs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteCV/:cvId", async (req, res) => {
  try {
    const { cvId } = req.params;

    // Find the CV by ID
    const cv = await CV.findById(cvId);

    if (!cv) {
      return res.status(404).json({ message: "CV not found." });
    }

    // Delete the CV document
    await CV.findByIdAndDelete(cvId);

    // Return success message
    res.json({ message: "CV deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/checkEmailAndJobId", async (req, res) => {
  const { email, job_id } = req.body;

  try {
    // Check if the email and job_id exist in the UserCv collection
    const existingCv = await CV.findOne({ Email: email, Job_id: job_id });

    // If the combination exists, return true; otherwise, return false
    const emailAndJobIdExist = Boolean(existingCv);

    res.json({ emailAndJobIdExist });
  } catch (error) {
    console.error("Error checking email and job_id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
