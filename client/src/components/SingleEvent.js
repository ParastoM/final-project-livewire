import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const SingleEvent = (props) => {
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
    </div>
  );
};

export default SingleEvent;
