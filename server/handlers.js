// require the 'request-promise' module.
const request = require("request-promise");
const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");
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

const getArtistInfo = (req, res) => {
  return request(
    `https://rest.bandsintown.com/artists/${req.params.artistName}?app_id=8ed898ae0c189455879a85790339fd58`
  )
    .then((response) => {
      return JSON.parse(response);
    })
    .then((parsedResponse) => {
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

    if (!existingUser || existingUser.email !== req.body.email) {
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
const addUserEvents = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const db = client.db("final_project");
    console.log("connected!");

    const { email, id, artistName } = req.body;

    const existingUserEvents = await db
      .collection("user_events")
      .findOne({ email: email });

    if (existingUserEvents) {
      const updatedEvents = [...existingUserEvents.events, { id, artistName }];

      await db
        .collection("user_events")
        .updateOne({ email: email }, { $set: { events: updatedEvents } });

      return res
        .status(200)
        .json({ status: 200, message: "user events updated" });
    } else {
      await db
        .collection("user_events")
        .insertOne({ email, events: [{ id, artistName }] });
      return res
        .status(201)
        .json({ status: 201, message: "user events added" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ status: 400, message: "user events not added" });
  }
};
const getUserEvents = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const db = client.db("final_project");
    console.log("connected!");

    const { email } = req.params;

    const existingUserEvents = await db
      .collection("user_events")
      .findOne({ email: email });

    return res.status(200).json({ status: 200, data: existingUserEvents });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: 404, message: "user events not found" });
  }
};

const addComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const db = client.db("final_project");
    console.log("connected!");

    const { email, eventId, comment } = req.body;

    const existingUser = await db
      .collection("user_events")
      .findOne({ email: email }); //if user exists, insert the comment

    if (existingUser) {
      const commentRes = await db
        .collection("event_comments")
        .insertOne({ email, eventId, comment });
      console.log(commentRes); // {acknowledged: true, insertId: id}
      return res.status(201).json({
        status: 201,
        message: "comment added",
        commentId: commentRes.insertedId,
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "user does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: 404, message: "comment not posted" });
  }
};

const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const db = client.db("final_project");
    console.log("connected!");

    const { email, commentId } = req.body;

    const existingUser = await db
      .collection("user_events")
      .findOne({ email: email });

    if (existingUser) {
      const deleteRes = await db
        .collection("event_comments")
        .deleteOne({ email, _id: new ObjectId(commentId) });

      return res.status(201).json({
        status: 201,
        message: "comment deleted",
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "user does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: 404, message: "unable to delete comment" });
  }
};
module.exports = {
  getArtistEvents,
  addUser,
  getArtistInfo,
  addUserEvents,
  getUserEvents,
  addComment,
  deleteComment,
};
