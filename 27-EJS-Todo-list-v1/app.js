const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const items = ["Wake up", "Grab a Brush", "Put a little makeup"];
const workItems = ["Get dressed", "Brush Teeth", "Suffer Under Capitalism"];

app.get("/", (req, res) => {
    const day = date.getDay();
    res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", newListItems: workItems })
});

app.get("/about", (req, res) => {
    console.log("about requested");
    res.render("about")
});

app.post("/", (req, res) => {

    if (req.body.list === "Work") {
        workItems.push(req.body.newToDo);
        res.redirect("/work");
    } else {
        items.push(req.body.newToDo)
        res.redirect("/");
    };
});

app.post("/work", (req, res) => {

    workItems.push(req.body.newToDo);
    res.redirect("/work");
});



app.listen(3000, () => {
    console.log("server started on port 3000");
});