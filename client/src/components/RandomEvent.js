import styled from "styled-components";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const RandomEvent = ({ event }) => {
  const navigate = useNavigate();

  // state is being stored in useLocation --> in singleEvent.js
  const handleClick = (ev) => {
    ev.preventDefault();
    navigate("eventdetails", { state: { event: event } });
  };
  console.log(event);
  return (
    <Container>
      {event && (
        <CardWrapper>
          <h2>{event.lineup[0]}</h2>
          {/* <p>{event.artist}</p> figure out how to get picture background */}
          <p>
            <span>{event.datetime}</span>
          </p>
          <p>
            <span>{event.venue.name} </span> -{" "}
            <span>{event.venue.location} </span>
          </p>
          <button onClick={(ev) => handleClick(ev)}>View event</button>
        </CardWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CardWrapper = styled.div`
  border: 1px solid black;
  margin-right: 10px;
  padding: 10px;
`;

const StyledLink = styled(Link)``;
export default RandomEvent;
