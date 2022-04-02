//Application imports
const express = require("express"),
      app = express(),
      layouts = require('express-ejs-layouts');
     homeController = require('./controllers/homeController'),
     errorController = require('./controllers/errorController');


//Database set-up ..................................................

/*const MongoDB = require('mongodb').MongoClient, //require the mongodb module to use the MongoClient class
          dbURL = "mongodb://localhost:27017", //set port to default port 
          dbName = "clonedBank_db"; //set up database name

MongoDB.connect(dbURL, (error, client) => { //set up connection to local database server
    if (error) throw error;
    let db = client.db(dbName) //Add the database to MongoDB server
    db.collection("customers")
          .find()
          .toArray((error, data) => {
              if(error) throw error;
              console.log(data)
          })
}) */

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/clonedBank_db",
    {useNewUrlParser : true}
)
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!")
})

//Database set up ends .........................................

//Apllication Settings 
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");



//Application utilities

app.use(express.urlencoded({extended: false})) // for processing URL encoded parameters
app.use(express.json()) //for processing JSON parameters
app.use(layouts)
app.use(express.static("public"))

//Application Routes 
app.get("/", (req, res) => {
    res.send("Welcome to Cloned Bank!")
});
app.get("/signin", homeController.showSignIn);



//Error Handlers
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


//start server
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`)
})