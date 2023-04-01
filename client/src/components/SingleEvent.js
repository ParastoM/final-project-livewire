import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import EventFeed from "./EventFeed";

const SingleEvent = (props) => {
  const [newComment, setNewComment] = useState("");
  //   const { eventid } = useParams();
  //   console.log(props);
  const { isAuthenticated, user } = useAuth0();

  console.log("isAuthenticated", isAuthenticated);
  const { state } = useLocation();
  const { event } = state;

  console.log("state", state);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user/events/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserEvents(data.data.events);
        });
    }
  }, [isAuthenticated]);

  const attendingHandler = () => {
    fetch("/user/events", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        id: state.event.id,
        artistName: state.event.lineup[0],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201 || 200) {
          window.alert("Event added, thanks for attending!");
        }
      });

    //       const sendComment = () => {
    //         fetch("/post-comment", {
    //             method: "POST",
    //             headers: {
    //               Accept: "application/json",
    //               "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //               email: user.email,
    //               eventId: state.event.id,
    //               comment: newComment
    //             }),
    //         })
    //         .then((res) => res.json())
    //         .then((data)=> {
    //             if (data.status === 201){
    //                 //loadcomment
    //                 setNewComment("")
    //             }
    //         })
    //       }
    //   };
  };

  return (
    <div>
      <h2>Event</h2>

      {state ? <div>{event.lineup}</div> : <div>No Selected Event!</div>}
      {isAuthenticated && (
        <button
          disabled={userEvents.find((element) => element.id === state.event.id)}
          onClick={attendingHandler}
        >
          {userEvents.find((element) => element.id === state.event.id)
            ? "Already attending!"
            : "Attending"}
        </button>
      )}
      <TextArea
        type="text"
        id="comment"
        value={newComment}
        onChange={(e) => {
          setNewComment(e.target.value);
          //   setcharacterCount(280 - e.target.value.length);
        }}
        maxLength={400}
        placeholder="What's on your mind?"
      />

      <Button>comment</Button>
      <Button>delete</Button>
      <Button>edit</Button>
    </div>
  );
};

const Button = styled.button`
  color: black;
  padding: 10px;
  border-radius: 20px;
  font-weight: bold;
  margin-left: 20px;
  opacity: 1;
  &:disabled {
    opacity: 0.5;
  }
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  width: 60vw;
  height: 150px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  //word-wrap: break-word;
`;

export default SingleEvent;
