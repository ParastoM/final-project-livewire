import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { json } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userEvents, setUserEvents] = useState([]);

  console.log("userEvents", userEvents);

  const userEventsData = async (eventsData) => {
    return await Promise.all(
      eventsData.map(async (musician) => {
        const res = await fetch(`/events/${musician.artistName}`);
        const data = await res.json();

        return data;
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
          });
        });
    }
  }, [isAuthenticated]);

  return (
    <div>
      {/* <img src={user.picture} alt="user picture" /> */}
      {/* <Text>{user.given_name}'s LiveWire</Text> */}
      <Text>Here are your upcoming shows:</Text>
      <Text>And the ones you're considering attending:</Text>
      <SearchLink to="/">Find more events</SearchLink>
    </div>
  );
};
const Text = styled.div`
  margin-left: 20px;
`;

const SearchLink = styled(Link)``;

export default Profile;
