const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const app = express();
const userRoutes=require('./routes/auth.routes');
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, {dbName: "SanKash"})
    .then(result => {
        console.log("result : connected");
    })
    .catch(err => {
        console.log("err", err)
    });

app.use(express.json());
app.use(morgan());
app.use(cors());
app.use("/api",userRoutes);

app.listen(PORT, () => {
    console.log("Connected", PORT);
});
