import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { json } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  console.log(isAuthenticated);
  if (!user) return null;

  return (
    <div>
      <img src={user.picture} alt="user picture" />
      <Text>{user.given_name}'s LiveWire</Text>
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
