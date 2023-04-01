import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import Footer from "./Footer";
import Header from "./Header";
import LogIn from "./LogInButton";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SingleEvent from "./SingleEvent";
import ArtistPage from "./ArtistPage";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" />
            <Route path="/eventdetails" element={<SingleEvent />} />
            <Route path="/artistdetails" element={<ArtistPage />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;
