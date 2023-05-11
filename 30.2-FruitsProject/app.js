const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/peopleDB");

// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });

// const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "John",
//   age: 37
// });

// person.save();

const fruitSchema = new mongoose.Schema({
  name: { type: String,
    required: [true, "no fruit name found"],
  score: {
    type: Number,
    min: 1,
    max: 10
    },
  review: String,
});


async function getFruits(){

  const allFruits = await Fruit.find({}, 'name');
  console.log(allFruits);
  mongoose.connection.close();
}

getFruits();

const Fruit = mongoose.model("Fruit", fruitSchema);

// const apple = new Fruit({
//   name: "Apple",
//   score: 8,
//   review: "Great Fruit",
// });

// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Good but annoying to eat",
// });

// const banana = new Fruit({
//   name: "Banana",
//   score: 8,
//   review: "One of the best fruits",
// });

// const blueberry = new Fruit({
//   name: "Blueberry",
//   score: 7,
//   review: "Wonderful flavor, too much skin per bite",
// });

// Fruit.insertMany([apple, orange, banana, blueberry])
//   .then(function (){
//   console.log("Success");
// })
// .catch(function (err){
//   console.log(err);
// });


// const insertDocuments = function(db, callback){

//   const collection = db.collection('fruits');
//   collection.insertMany([
//     {
//       name: "Apple",
//       score: 8,
//       review: "Great fruit"
//     },
//     {
//       name: "Orange",
//      score: 6,
//      review: "Good flavor but annoying to eat"
//     },

//     {
//       name: "Lemon",
//       score: 4,
//       review: "Love the tartness, sucks to eat, INCREDIBLE FOR BAKING AND COOKING"
//     }
//   ])

// }
