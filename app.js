const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BookRoute = require("./routes/Book");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/books", BookRoute);

const PORT = process.env.PORT || 3000;

mongoose
    .connect(
        "mongodb+srv://hope:VekA0J3rcp683DBb@cluster0.5xpywxl.mongodb.net/Cluster0"
    )
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, function () {
            console.log("Server is running on port " + PORT);
        });
    })
    .catch(function (err) {
        console.error("Error connecting to database:", err);
    });
