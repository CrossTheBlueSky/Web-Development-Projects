//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")

const itemSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model("item", itemSchema);
const shop = new Item({name: "Go Shopping", list: "Default"});
const cook = new Item({name: "Cook Dinner", list:"Default"});
const dog = new Item({name: "Pet Dog", list:"Default"});
const defaultItems = [shop, cook, dog];
const listSchema = ({name: String, items: [itemSchema]});
const List = mongoose.model("List", listSchema);

app.get("/", async function(req, res){

  try{
    const allItems = await Item.find({});
    if(allItems.length === 0){
      Item.insertMany(defaultItems)
      .then(()=>{
        console.log("success")
      })
      .catch((err)=>{
        console.log(err)
      })
      res.redirect("/")
    }
    else{
      res.render("list", {listTitle: "Today", newListItems: allItems});
    }

  }catch (err){
    console.log(err);
}
});

app.get("/:customListName", async(req, res) => {

    const customListName = _.capitalize(req.params.customListName);
    const foundList = await List.findOne({name: customListName})
    if(foundList){
      res.render("list", {listTitle:foundList.name, newListItems: foundList.items})
    }
    else{
    const list = new List({
      name: customListName,
      items: defaultItems
    })
      list.save();
      res.redirect("/" + customListName);
    }

  });

app.post("/", async function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = Item({name: itemName});
  const newFoundList = await List.findOne({name:listName}).exec();

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    newFoundList.items.push(item);
    newFoundList.save();
    res.redirect("/" + listName)
  }


});

app.post("/delete", function(req, res){

  const checkedListName = req.body.listName;

  async function deleter(listName){
  const checkedItemId = req.body.checkbox;

  if(listName === "Today"){
  const del = await Item.findByIdAndDelete(checkedItemId);
  res.redirect("/");
  }else{
   List.findOneAndUpdate({name: checkedListName}, {$pull: {items: {_id:checkedItemId}}})
   .then(()=>{res.redirect("/"+listName)})
   .catch((err)=>{
    console.log(err);
   })
  }
}
  deleter(checkedListName);


})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
