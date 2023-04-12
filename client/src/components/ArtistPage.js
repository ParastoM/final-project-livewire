import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ArtistPage = ({ artistName }) => {
  const { user, isAuthenticated } = useAuth0();
  const [events, setEvents] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("my state", state);

  const { artist, event } = state;
  const backgroundImageUrl = artist.image_url;
  console.log(event);

  useEffect(() => {
    fetch(`/events/${artist.name}`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [artistName]);
  if (!state) {
    return <div>Go back to homepage</div>;
  }

  if (!artist.name) {
    return <div>Artist not found</div>;
  }

  const handleClick = (artistName, eventId) => {
    fetch(`/events/${artistName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const eventInfo = data.data.find((event) => event.id === eventId);
          navigate("/eventdetails", {
            state: { event: eventInfo, artist: artist },
          });
        }
      });
  };

  return (
    <Container>
      <NameContainer>
        <Name>{artist.name}</Name>
        {artist.upcoming_event_count === 0 ? (
          <Number>No upcoming tour dates for now</Number>
        ) : (
          <Number>{artist.upcoming_event_count} upcoming shows</Number>
        )}
      </NameContainer>
      <SomeDiv>
        <ArtistImage src={backgroundImageUrl} />
        {/* <p>{artist.links[0].url}</p> */}
        <TourList>
          {events.length > 0 &&
            events.map((event) => {
              return (
                <TourDate>
                  <P>{event.venue.name}</P>
                  <P>{event.venue.location}</P>
                  <P>
                    {moment
                      .utc(event.datetime)
                      .format("MMM Do, YYYY · h:mm A  ")}{" "}
                  </P>
                  <Button
                    onClick={() => {
                      handleClick(event.lineup[0], event.id);
                    }}
                  >
                    View event
                  </Button>
                </TourDate>
              );
            })}
        </TourList>
      </SomeDiv>
    </Container>
  );
};

const P = styled.p`
  margin-bottom: 5px;
`;

const ArtistImage = styled.img`
  width: 400px;
  height: 500px;
  object-fit: cover;
  order: 1;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImageUrl});
`;
const SomeDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const Number = styled.div`
  margin-bottom: 15px;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div``;

const TourList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 10px;
`;

const Button = styled.button`
  margin-top: 3px;
`;

const TourDate = styled.div`
  border: 1px solid;
  color: white;
  background: #ff00d4;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  height: 150px;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-right: 50px;
  margin-left: 50px;
`;

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default ArtistPage;
