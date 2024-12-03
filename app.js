const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Basic GET route
app.get("/", (req, res) => {
  res.send("Hello World! This is a basic GET function.");
});

// GET route to fetch data from an API
app.get("/league", async (req, res) => {
  try {
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/leagues-classic/856056/standings"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from API");
  }
});

app.get("/user", async (req, res) => {
  try {
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/api/entry/1531645/"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from API");
  }
});

// fantasy.premierleague.com/api/entry/1531645/

https: app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
