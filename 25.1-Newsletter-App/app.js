const express = require("express");
const https = require("https");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.listen(3000, () => {
    console.log("server opened on port 3000");
});

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/signup.html");


});

app.post("/", (req, res) => {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName)
});