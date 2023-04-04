import { useEffect, useState } from "react";
import styled from "styled-components";
import artistsArray from "../data/artists";
import { artistsOnTourArray } from "../data/artists";
import Typeahead from "./Typeahead";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import RandomEvent from "./RandomEvent";
import RandomArtist from "./RandomArtist";

const Homepage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [artist, setArtist] = useState(null);
  const [randEvents, setRandEvents] = useState([]);
  const [randArtists, setRandArtists] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  const randomEventSelect = async (randomArtists) => {
    //using Promise.all because this will wait on result from all 3 before displaying
    return await Promise.all(
      randomArtists.map(async (musician) => {
        const res = await fetch(`/events/${musician}`);
        const data = await res.json();

        return data;
      })
    );
  };
  const getRandomArtistInfo = async (randomArtists) => {
    return await Promise.all(
      randomArtists.map(async (musician) => {
        const res = await fetch(`/artists/${musician}`);
        const data = await res.json();
        const parsedData = await data;
        return parsedData;
      })
    );
  };

  useEffect(() => {
    const randomArtists = artistsOnTourArray
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);

    //fetch randomEvents
    const fetchRandomEvents = async () => {
      await randomEventSelect(randomArtists).then((data) => {
        const randomEvents = data.map((element) => {
          const allEvents = element.data;
          const randIndex = Math.floor(Math.random() * allEvents.length);
          return allEvents[randIndex];
        });
        setRandEvents(randomEvents);
      });
    };

    fetchRandomEvents();
  }, []);

  useEffect(() => {
    const randomArtists = artistsArray
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);

    getRandomArtistInfo(randomArtists).then((data) => {
      const randomArtistsObjects = data.map((element) => {
        const allArtists = element.data;
        return allArtists;
      });
      setRandArtists(randomArtistsObjects);
    });
  }, []);

  return (
    <Wrapper>
      {user && isAuthenticated && randEvents && randArtists ? (
        <Welcome>Hey {user.nickname}!</Welcome>
      ) : (
        <></>
      )}
      <Type>
        <Typeahead />
      </Type>
      <Text>Upcoming Events</Text>
      <SomeEvent>
        {randEvents.length &&
          randEvents.map((concert, index) => {
            return <RandomEvent key={index} event={concert} />;
          })}
      </SomeEvent>
      <Text>Search by artist</Text>
      <SomeArtist>
        {randArtists.length &&
          randArtists.map((artist, index) => {
            return <RandomArtist key={index} artist={artist} />;
          })}
      </SomeArtist>
    </Wrapper>
  );
};

const Text = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 30px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const SomeEvent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
`;

const SomeArtist = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 100px;
`;

const Welcome = styled.div`
  margin-left: 40px;
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #ff00d4;
`;

export default Homepage;
