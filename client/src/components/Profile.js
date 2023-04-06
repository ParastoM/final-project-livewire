import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { json } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userEvents, setUserEvents] = useState([]);
  const [artist, setArtist] = useState(null);
  const navigate = useNavigate();

  const userEventsData = async (eventsData) => {
    return await Promise.all(
      eventsData.map(async (musician) => {
        const res = await fetch(`/events/${musician.artistName}`);
        const data = await res.json();
        console.log("user", eventsData);
        console.log("datadata", data.data);

        const matchingEvent = data.data.find((event) => {
          let found = false;
          eventsData.forEach((element) => {
            if (element.id === event.id) {
              found = true;
            }
          });
          return found;
        });
        console.log("matchingEvent", matchingEvent);
        return matchingEvent;
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user/events/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          userEventsData(data.data.events).then((data) => {
            setUserEvents(data);
            console.log(data);
          });
        });
    }
  }, [isAuthenticated]);

  // const handleClick = (ev) => {
  //   ev.preventDefault();
  //   navigate("/eventdetails", { state: { artist: artist } });
  // };

  return (
    <Container>
      <H2>Here are your upcoming shows</H2>
      {userEvents
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .map((event) => (
          <div key={event.id}>
            <EventContainer>
              <Text>
                {event.lineup[0]}{" "}
                {event.lineup[1] ? <span>with {event.lineup[1]} </span> : <></>}{" "}
              </Text>
              <Text> at {event.venue.name}</Text>

              <Text>{event.venue.street_address}</Text>
              <Text>{event.venue.location}</Text>
              <Text>
                {" "}
                {moment
                  .utc(event.datetime)
                  .format("MMM Do, YYYY · h:mm A  ")}{" "}
              </Text>
              {/* <Button onClick={(ev) => handleClick(ev)}>View event</Button> */}
            </EventContainer>
          </div>
        ))}
      <SearchLink to="/">Find more events</SearchLink>
    </Container>
  );
};

const H2 = styled.h2`
  background-color: #ff00d4;
  color: white;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
`;

const Container = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div`
  margin-left: 20px;
`;

const SearchLink = styled(Link)`
  background-color: #ff00d4;
  color: white;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
`;

const EventContainer = styled.div`
  border: solid 1px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 40vw;
`;

const Button = styled.button``;

export default Profile;
