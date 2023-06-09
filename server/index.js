"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;

const {
  getArtistEvents,
  addUser,
  getArtistInfo,
  addUserEvents,
  getUserEvents,
  addComment,
  editComment,
  deleteComment,
  getArtistList,
  getComment,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  .get("/test", (req, res) => {
    res.status(200).json({ itWorked: true });
  })

  .get("/events/:artistName", getArtistEvents)
  .get("/artists/:artistName", getArtistInfo)

  .post("/user", addUser)
  .post("/user/events", addUserEvents)
  .get("/user/events/:email", getUserEvents)
  .post("/post-comment", addComment)
  .get("/get-comment/:eventId", getComment)
  .post("/edit-comment", editComment)
  .delete("/delete-comment", deleteComment)

  .get("/artistList", getArtistList)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8888.
  .listen(8888, () => console.log(`Listening on port 8888`));
