import styled from "styled-components";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const RandomEvent = ({ event }) => {
  //const backgroundImageUrl = artist.image_url;
  //console.log(backgroundImageUrl);
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

          <p>{event.venue.name} </p>
          <p>
            <span>{event.venue.location} </span>
          </p>

          <p>{moment.utc(event.datetime).format("MMM Do, YYYY · h:mm A  ")} </p>
          <Button onClick={(ev) => handleClick(ev)}>View event</Button>
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
  height: 200px;
  width: 350px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImageUrl});
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 100px;
`;

const StyledLink = styled(Link)``;
export default RandomEvent;
