// routes/stations.js

import express from "express";
import Station from "../models/Station.js";

const router = express.Router();

router.post('/stations', async (req, res) => {
  try {
    const { Chapter } = req.body;

    // Validate the request body
    if (!Chapter) {
      return res.status(400).json({ error: 'Chapter is required' });
    }

    // Create a new station
    const newStation = new Station({ Chapter });

    // Save the station to the database
    const savedStation = await newStation.save();

    res.status(201).json(savedStation);
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate Chapter. Station with the same Chapter already exists.' });
    }

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/GetStations', async (req, res) => {
    try {
      const stations = await Station.find();
      res.status(200).json(stations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;