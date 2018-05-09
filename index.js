const express = require("express");
const bodyParser = require("body-parser");

const dbConfig = require("./config/db.config.js");
const mongoose = require("mongoose");
const Multiply = require("./src/models/multiply.model.js");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("src"));

mongoose.Promise = global.Promise;

// Connecting to the Database
mongoose.connect(dbConfig.url)
    .then(function(){
        console.log("Successfully connected to the Database");
    })
    .catch(function(){
        console.log("Failed to connect to the Database. Terminating the application...");
        process.exit();
    });

app.get("/", function(req, res){
    res.send("index.html");
});

app.get("/getData", function(req, res){
    Multiply.find()
        .then(function(sr){
            res.send(sr);
        })
        .catch(function(er){
            res.status(500).send({
                message:"Failed to get the data"
            });
        });
});

app.post("/sendData", function(req, res){
    const multiply = new Multiply({
        firstArg: req.body.data.firstArg,
        secondArg: req.body.data.secondArg,
        result: req.body.data.result
    });
    multiply.save()
        .then( function(sr){
            res.send(sr);
        })
        .catch(function(er){
            res.status(500).send({
                message: "Sorry, failed to multiply numbers"
            })
        })
});

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});