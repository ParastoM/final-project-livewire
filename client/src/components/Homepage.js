import { useEffect, useState } from "react";
import styled from "styled-components";
import artistsArray from "../data/artists";
import Typeahead from "./Typeahead";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [artist, setArtist] = useState(null);
  const [randEvents, setRandEvents] = useState([]);

  const randomEventSelect = async (randomArtists) => {
    return await Promise.all(
      randomArtists.map(async (person) => {
        const res = await fetch(`/events/${person}`);
        const data = await res.json();
        return data;
      })
    );
  };

  useEffect(() => {
    const randomArtists = artistsArray
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);

    randomEventSelect(randomArtists).then((data) => {
      setRandEvents(data);
    });
  }, []);

  return (
    <Wrapper>
      <Type>
        <Typeahead />
      </Type>
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

export default Homepage;
