// signupRoutes.js
import express from 'express';
import User from '../models/User.js';
import Education from '../models/Education.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Experience from '../models/Experience.js';

const router = express.Router();

// Route for signup
// Route for signup
router.post('/signup', async (req, res) => {
  try {
    const requiredFieldsBase = ['firstName', 'lastName', 'cnicNo', 'mobileNo', 'emailAddress', 'password', 'category', 'address', 'city', 'country'];

    const userCategory = req.body.category;

    let requiredFields = [...requiredFieldsBase];

    // Adjust required fields based on category
    if (userCategory === 'Group') {
      requiredFields = requiredFields.filter(field => field !== 'dob' && field !== 'qualification' && field !== 'gender' && field !== 'designation');
      requiredFields.push('people');
    }else if (userCategory === 'Company') {
      requiredFields = requiredFields.filter(field => field !== 'dob' && field !== 'qualification' && field !== 'gender' && field !== 'designation');
      requiredFields.push('people','NTN');
    }  
    else {
      requiredFields.push('dob', 'qualification');
    }

    // Validate required fields
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `The field '${field}' must not be empty.` });
      }
    }

    const existingUser = await User.findOne({ emailAddress: req.body.emailAddress });
    if (existingUser) {
      return res.status(400).json({ error: 'Email address is already registered.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for login
router.post('/login', async (req, res) => {
  try {
    // Check if any required field is empty
    const requiredFields = ['emailAddress', 'password' ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `The field '${field}' must not be empty.` });
      }
    }

    // Find the user by email address and category
    const user = await User.findOne({
      emailAddress: req.body.emailAddress,
      // category: req.body.category,
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email address or category.' });
    }

    // Compare the user-provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Generate and send a JWT token for authentication with a 7-day expiration
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '7d' });

    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.emailAddress, 
        category: user.category 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/bio', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email address is required in the parameters.' });
    }

    const user = await User.findOne({ emailAddress: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    
    const sanitizedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      cnicNo:user.cnicNo,
      mobileNo:user.mobileNo,
      dob:user.dob,
      address:user.address
    };

    res.status(200).json(sanitizedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/educations', async (req, res) => {
  try {
    
    const {userEmail} = req.query;

    // Find the user by email
    const user = await User.findOne({ emailAddress: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newEducation = new Education({
      degree: req.body.degree,
      subject: req.body.subject,
      year: req.body.year,
      user: user._id,
      Email:user.emailAddress
    });

    const savedEducation = await newEducation.save();

    res.status(201).json(savedEducation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/geteducations', async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await Education.find({ Email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deleteEducation/:educationId', async (req, res) => {
  try {
    const { educationId } = req.params;

    // Find and delete the specific education record by ID
    const deletedEducation = await Education.findByIdAndDelete(educationId);

    if (!deletedEducation) {
      return res.status(404).json({ error: 'Education record not found' });
    }

    res.status(200).json({ message: 'Education record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// route for the update 
router.put('/updateEducation/:educationId', async (req, res) => {
  try {
    const { educationId } = req.params;

    // Find and update the specific education record by ID
    const updatedEducation = await Education.findByIdAndUpdate(
      educationId,
      {
        // Update fields based on your request body
        $set: {
          degree: req.body.degree,
          subject: req.body.subject,
          year: req.body.year,
        },
      },
      { new: true } // Return the modified document
    );

    if (!updatedEducation) {
      return res.status(404).json({ error: 'Education record not found' });
    }

    res.status(200).json({ message: 'Education record updated successfully', updatedEducation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




export default router;
