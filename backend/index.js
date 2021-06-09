const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const AAMController = require("./Controllers/Controller.js");


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .catch((err) => {
        console.log(err, "did not connect");
    });

MongoClient.connect(uri, function (err, client) {
    assert.equal(null, err);
    client.close();
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongo database connection established successfully");
});


// this is where you would add another controller. one for users and one for broker fees
// so far 

app.use("/apexautomovers", AAMController);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});