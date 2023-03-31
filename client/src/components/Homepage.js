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

  const randomEventSelect = async (randomArtists) => {
    //using Promise.all because this will wait on result from all 3 before displaying
    return await Promise.all(
      randomArtists.map(async (musician) => {
        const res = await fetch(`/events/${musician}`);
        const data = await res.json();
        console.log(data);
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

    randomEventSelect(randomArtists).then((data) => {
      const randomEvents = data.map((element) => {
        const allEvents = element.data;
        const randIndex = Math.floor(Math.random() * allEvents.length);
        return allEvents[randIndex];
      });
      setRandEvents(randomEvents);
    });
  }, []);

  useEffect(() => {
    const randomArtists = artistsArray
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);

    getRandomArtistInfo(randomArtists).then((data) => {
      const randomArtistsObjects = data.map((element) => {
        const allArtists = element.data;
        console.log(allArtists);
        return allArtists;
      });
      setRandArtists(randomArtistsObjects);
    });
  }, []);

  return (
    <Wrapper>
      <Type>
        <Typeahead />
      </Type>
      <SomeEvent>
        {randEvents.length &&
          randEvents.map((concert, index) => {
            return <RandomEvent key={index} event={concert} />;
          })}
      </SomeEvent>
      <SomeArtist>
        {console.log(randArtists)}
        {randArtists.length &&
          randArtists.map((artist, index) => {
            return <RandomArtist key={index} artist={artist} />;
          })}
      </SomeArtist>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const SomeEvent = styled.div`
  display: flex;
  flex-direction: row;
`;

const SomeArtist = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Homepage;
