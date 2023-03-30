const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const artists = require("./data/artists");
console.log(artists);
const batchImport = async (data) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const db = client.db("final_project");
    console.log("connected!");

    await db.collection("artists").insertMany(artists);
    console.log("artists added!");
  } catch (error) {
    console.log("error:", error);
  }
  client.close();
  console.log("disconnected!");
};

batchImport();
