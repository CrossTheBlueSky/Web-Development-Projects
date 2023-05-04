const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Don't contact me lul</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>I'm a dog who programs and does other stuff sometimes too.</h1>");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});