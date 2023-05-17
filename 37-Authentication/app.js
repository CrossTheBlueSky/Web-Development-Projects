require('dotenv').config();
const findOrCreate = require("mongoose-findorcreate");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose= require("passport-local-mongoose")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(session({
    secret:"out little secret.",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB")


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", (req, res) => {

    res.render("home");
});

app.get("/submit", (req, res)=>{
    if(req.isAuthenticated){
        res.render("submit");
    }else{
        res.redirect("/login")
    }

})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });
app.get("/login", (req, res) => {

    res.render("login");
});

app.get("/register", (req, res) => {

    res.render("register");
});

app.get("/secrets", async (req, res)=>{

    const foundUsers = await User.find({"secret":{$ne: null}})
    .then((foundUsers)=>{
        if(foundUsers){
            res.render("secrets", {usersWithSecrets : foundUsers})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get("/logout", (req,res)=>{
    req.logout((err)=>{
        if (err){res.send(err);
        }else{
            res.redirect("/");
        }
    });

})

app.post("/register", (req, res) => {
 
    User.register({username: req.body.username}, req.body.password, (err, user)=>{
        if (err){
            console.log(err);
            res.redirect("/register");
        } else{
            passport.authenticate("local")(req,res, ()=>{
                res.redirect("/secrets");
            })
        }
    })

})

app.post("/login", async (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err)=>{
        if (err){
            console.log(err);
            res.redirect("/register");
        } else{
            passport.authenticate("local")(req,res, ()=>{
                res.redirect("/secrets");
            })
        }

    })
})

app.post("/submit", async (req, res)=>{
    const submittedSecret = req.body.secret;
    const foundUser = await User.findById(req.user.id)
    .then((foundUser)=>{
        if(foundUser){
            foundUser.secret=submittedSecret
            foundUser.save()
            res.redirect("/secrets")
        }
    })
    .catch((err)=>{console.log(err)})

})

app.listen(3000, () => {
    console.log("server started on port 3000");
});