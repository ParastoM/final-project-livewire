import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const ArtistPage = () => {
  const location = useLocation();
  const artist = location.state.artist;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.upcoming_event_count} upcoming shows</p>
      {/* render other details about the artist */}
    </div>
  );
};

export default ArtistPage;
