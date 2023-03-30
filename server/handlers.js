// require the 'request-promise' module.
const request = require("request-promise");
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Returns the current position of the ISS
const getArtistEvents = (req, res) => {
  return request(
    `https://rest.bandsintown.com/artists/${req.params.artistName}/events?app_id=8ed898ae0c189455879a85790339fd58`
  )
    .then((response) => {
      //console.log(response);
      return JSON.parse(response);
    })
    .then((parsedResponse) => {
      // console.log(parsedResponse);
      return res.status(200).json({ status: 200, data: parsedResponse });
    })
    .catch((err) => res.status(404).json({ status: 404, message: err }));
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const db = client.db("final_project");
    console.log("connected!");

    const { email } = req.body;
    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser.email !== req.body.email) {
      await db.collection("users").insertOne(req.body);
      return res.status(201).json({ status: 201, message: "user added" });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "user already exists" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 400, message: "user not added" });
  }
};
module.exports = { getArtistEvents, addUser };
