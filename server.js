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
    res.send("yo World")
  })