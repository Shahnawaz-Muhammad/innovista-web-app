// routes/stations.js

import express from "express";
import Station from "../models/Station.js";

const router = express.Router();

router.post("/stations", async (req, res) => {
  try {
    const { Chapter } = req.body;

    // Validate the request body
    if (!Chapter) {
      return res.status(400).json({ error: "Chapter is required" });
    }

    // Create a new station
    const newStation = new Station({ Chapter });

    // Save the station to the database
    const savedStation = await newStation.save();

    res.status(201).json(savedStation);
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        error:
          "Duplicate Chapter. Station with the same Chapter already exists.",
      });
    }

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/GetStations", async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/stations/:chapter/reservation-types', async (req, res) => {
  const chapter = req.params.chapter;

  try {
    // Find the station by chapter name
    const station = await Station.findOne({ Chapter: chapter });

    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    // Return the reservation types
    res.status(200).json({ reservationTypes: station.reservationTypes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request to update a station by ID
router.put("/UpdateStations/:id", async (req, res) => {
  const { id } = req.params;
  const { Chapter } = req.body;

  try {
    // Validate the request body
    if (!Chapter) {
      return res.status(400).json({ error: "Chapter is required" });
    }

    const updatedStation = await Station.findByIdAndUpdate(
      id,
      { Chapter },
      { new: true } // Return the updated document
    );

    if (!updatedStation) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.status(200).json(updatedStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE request to delete a station by ID
router.delete("/DeleteStations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStation = await Station.findByIdAndDelete(id);

    if (!deletedStation) {
      return res.status(404).json({ error: "Station not found" });
    }

    res
      .status(200)
      .json({ message: "Station deleted successfully", deletedStation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/stations/:chapter/reservation-types", async (req, res) => {
  const { chapter } = req.params;
  const { reservationTypes } = req.body;

  try {
    // Find the station by Chapter
    const station = await Station.findOne({ Chapter: chapter });

    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    // Append new reservation types to the existing array
    if (!station.reservationTypes) {
      station.reservationTypes = [];
    }

    station.reservationTypes =
      station.reservationTypes.concat(reservationTypes);

    // Save the updated station
    const updatedStation = await station.save();

    res.status(200).json(updatedStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/stations/:chapter/reservation-types/:id", async (req, res) => {
  const { chapter, id } = req.params;

  try {
    // Find the station by Chapter
    const station = await Station.findOne({ Chapter: chapter });

    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    // Find the index of the reservation type to be deleted
    const indexToDelete = station.reservationTypes.findIndex(
      (type) => type._id.toString() === id
    );

    // Check if the reservation type exists
    if (indexToDelete === -1) {
      return res.status(404).json({ error: "Reservation type not found" });
    }

    // Remove the reservation type from the array
    station.reservationTypes.splice(indexToDelete, 1);

    // Save the updated station
    const updatedStation = await station.save();

    res.status(200).json(updatedStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
