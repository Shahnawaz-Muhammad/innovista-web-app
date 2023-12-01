import express from "express";
import User from "../models/User.js";
import Experience from "../models/Experience.js";

const router = express.Router();

router.post("/experience", async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await User.findOne({ emailAddress: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newExperience = new Experience({
      companyName: req.body.companyName,
      designation: req.body.designation,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      Email: user.emailAddress,
    });

    const savedExp = await newExperience.save();

    res.status(201).json(savedExp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getExperience", async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await Experience.find({ Email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteExperience/:ExperienceId", async (req, res) => {
  try {
    const { ExperienceId } = req.params;

    // Find and delete the specific experience record by ID
    const deletedExperience = await Experience.findByIdAndDelete(ExperienceId);

    if (!deletedExperience) {
      return res.status(404).json({ error: "Experience record not found" });
    }

    res.status(200).json({ message: "Experience record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateExperience/:ExperienceId", async (req, res) => {
  try {
    const { ExperienceId } = req.params;

    const updatedExperience = await Experience.findByIdAndUpdate(
      ExperienceId,
      {
        $set: {
          companyName: req.body.companyName,
          designation: req.body.designation,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ error: "Experience record not found" });
    }

    res.status(200).json({
      message: "Experience record updated successfully",
      updatedExperience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
