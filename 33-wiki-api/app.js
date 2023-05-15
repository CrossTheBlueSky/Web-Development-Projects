const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")
  .get(async (req, res) => {
    const allArticles = await Article.find({})
      .then((allArticles) => {
        res.send(allArticles);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle
      .save()
      .then(() => {
        res.send("Successfully added");
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .delete((req, res) => {
    Article.deleteMany({})
      .then(() => {
        res.send("Deleted everything");
      })
      .catch((err) => {
        res.send(err);
      });
  });

app.route("/articles/:title")
.get(async (req, res) =>{
    //const fixedTitle = _.capitalize(req.params.title)
    const currentArticle = await Article.findOne({title: req.params.title}).exec();
    const errorArticle = { title: "You Fucked Up", content: "The url is probably wrong, try again bud" };
    if(currentArticle){
        res.send(currentArticle);
    }else{
        res.send(errorArticle);
    }

})
.put((req, res)=>{

    Article.replaceOne({title: req.params.title}, req.body)
    .then(()=> {res.send("Successfully replaced")})
    .catch((err)=>{res.send(err)});
})
.patch((req, res)=>{
    Article.updateOne({title: req.params.title}, {$set: req.body})
    .then(()=> {res.send("Successfully updated")})
    .catch((err)=>{res.send(err)});
})
.delete((req, res)=>{
    Article.deleteOne({title:req.params.title})
    .then(()=>{
        res.send("deleted " + req.params.title)
    })
    .catch((err)=>{
        res.send(err);
    })
})

app.listen(3000, () => {
  console.log("server started on port 3000");
});
