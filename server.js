// Dependencies
require("dotenv").config();
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const {PORT = 3001, DATABASE_URL} = process.env

////////////////////
// Database Connection
////////////////////
// Establish DB connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Connection events
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (err) => console.log(err))

////////////////////
// Bookmark Model
////////////////////
const MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
    genre: String,
    description: String,
    coverImage: String,
  })
  
  const Movie = mongoose.model("Movie", MovieSchema)

////////////////////
// MiddleWare
////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Hello World")
  })

// Index Route
app.get("/movies", async (req, res) => {
    try {
        res.json(await Movie.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
  });
  
  // Create Route
  app.post("/movies", async (req, res) => {
    try {
        res.json(await Movie.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
  });  
  
  // Delete Route
  app.delete("/movies/:id", async (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the movie
    try {res.json(await Movie.findByIdAndRemove(id));
    } catch (error) {
        res.status(400).json(error);
    }
  });
  
  // Update Route
  app.put("/movies/:id", async (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the movie
    try {res.json(await Movie.findByIdAndUpdate(id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error);
    }
  });


// Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))