const express = require("express");
const app = express();
// const MongoClient = require("mongodb").MongoClient;
const PORT = 2000;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "philosophers_bio";

const { MongoClient } = require("mongodb");

MongoClient.connect(dbConnectionStr, { useNewUrlParser: true })
  .then((client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
// User: eugenfmorar
// PSW: TPNPWpWqw6tZO9uM
// My IP address: 73.22.92.105

app.get("/", (request, response) => {
  db.collection("philosophers_bio")
    .find()
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addPhilosopher", (request, response) => {
  db.collection("philosophers_bio")
    .insertOne({
      philosopherName: request.body.philosopherName,
      birthPlace: request.body.birthPlace,
      likes: 0,
    })
    .then((result) => {
      console.log("Philosopher Added");
      response.redirect("/");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.put("/addOneLike", (request, response) => {
  db.collection("philosophers_bio")
    .updateOne(
      {
        philosopherName: request.body.philosopherNameS,
        birthPlace: request.body.birthPlaceS,
        likes: request.body.likesS,
      },
      {
        $set: {
          likes: request.body.likesS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Like");
      response.json("Like Added");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.delete("/deletePhilosopher", (request, response) => {
  db.collection("philosopher_bio")
    .deleteOne({
      philosopherName: request.body.philosopherNameS,
    })
    .then((result) => {
      console.log("Philosopher Deleted");
      response.json("Philosopher Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
