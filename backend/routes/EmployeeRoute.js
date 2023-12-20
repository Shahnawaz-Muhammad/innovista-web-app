import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Employees from "../models/EmployeeModel.js";
const router = express.Router();

router.post("/Employees", async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await User.findOne({ emailAddress: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newEmployee = new Employees({
      EmployeeName: req.body.EmployeeName,
      E_ContactNo: req.body.E_ContactNo,
      EmpId: req.body.EmpId,
      Designation: req.body.Designation,
      Email: user.emailAddress,
      EmployeeEmail: req.body.EmployeeEmail,
    });

    const savedEmp = await newEmployee.save();

    res.status(201).json(savedEmp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/GetEmployeeList", async (req, res) => {
  try {
    const { CompEmail } = req.query;

    // Find the user by email
    const user = await Employees.find({ Email: CompEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/updateEmployee/:EmployeeId", async (req, res) => {
  try {
    const { EmployeeId } = req.params;

    const updatedEmployee = await Employees.findByIdAndUpdate(
      EmployeeId,
      {
        $set: {
          EmployeeName: req.body.EmployeeName,
          E_ContactNo: req.body.E_ContactNo,
          EmpId: req.body.EmpId,
          Designation: req.body.Designation,
          Status: req.body.Status,
          EmployeeEmail: req.body.EmployeeEmail,
        },
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee record not found" });
    }

    res.status(200).json({
      message: "Employee record updated successfully",
      updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteEmployee/:EmployeeId", async (req, res) => {
  try {
    const { EmployeeId } = req.params;

    // Find and delete the specific experience record by ID
    const deletedExperience = await Employees.findByIdAndDelete(EmployeeId);

    if (!deletedExperience) {
      return res.status(404).json({ error: "Employee record not found" });
    }

    res.status(200).json({ message: "Employee record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
