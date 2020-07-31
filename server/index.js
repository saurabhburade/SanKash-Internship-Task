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
if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(__dirname, "../client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../client", "build", "index.html")
        );
    });
}
app.listen(PORT, () => {
    console.log("Connected", PORT);
});
