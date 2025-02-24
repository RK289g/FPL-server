const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors());

// Fetch Team Details
app.get("/user/:teamId", async (req, res) => {
  const { teamId } = req.params;
  try {
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${teamId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching team data");
  }
});

// Fetch Latest Event ID
app.get("/latest-event", async (req, res) => {
  try {
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    res.json({ current_event: response.data.current_event });
  } catch (error) {
    res.status(500).send("Error fetching latest event data");
  }
});

// Fetch Team Picks for an Event
app.get("/user/:teamId/event/:eventId", async (req, res) => {
  const { teamId, eventId } = req.params;
  try {
    console.log(`Fetching team ${teamId} picks for event ${eventId}...`);

    const response = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${teamId}/event/${eventId}/picks/`
    );

    console.log("API Response:", response.data);
    if (!response.data || !response.data.picks) {
      return res.status(404).json({ error: "No picks found" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching picks:", error.message);
    res.status(500).json({ error: "Error fetching team picks data" });
  }
});

// Fetch All Players Data
app.get("/players", async (req, res) => {
  try {
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    res.json(response.data.elements);
  } catch (error) {
    res.status(500).send("Error fetching player data");
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
