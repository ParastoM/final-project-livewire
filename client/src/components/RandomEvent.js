import styled from "styled-components";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useState, useEffect } from "react";

const RandomEvent = ({ event }) => {
  const [artist, setArtist] = useState(null);
  const navigate = useNavigate();

  const handleClick = (ev) => {
    ev.preventDefault();
    navigate("eventdetails", { state: { event: event, artist: artist } });
  };
  const getRandomArtistInfo = async (randomArtist) => {
    const res = await fetch(`/artists/${randomArtist}`);
    const data = await res.json();
    const parsedData = await data;
    return parsedData;
  };
  const fetchArtistInfo = async () => {
    const artistInfo = await getRandomArtistInfo(event.lineup[0]);
    setArtist(artistInfo.data);
  };

  useEffect(() => {
    fetchArtistInfo();
  }, [event]);

  return (
    <Container>
      {event && artist && (
        <CardWrapper backgroundImageUrl={artist.thumb_url} alt="background">
          <Text>
            <h2>{event.lineup[0]}</h2>

            <p>{event.venue.name} </p>
            <p>
              <span>{event.venue.location} </span>
            </p>

            <p>
              {moment.utc(event.datetime).format("MMM Do, YYYY · h:mm A  ")}{" "}
            </p>
            <Button onClick={(ev) => handleClick(ev)}>View event</Button>
          </Text>
        </CardWrapper>
      )}
    </Container>
  );
};

const Text = styled.div`
  &:hover {
    background: #ff00d4;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CardWrapper = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border: 1px solid black;
  color: white;
  margin-right: 10px;
  padding: 10px;
  height: 300px;
  width: 350px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImageUrl});
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
`;

const StyledLink = styled(Link)``;
export default RandomEvent;
