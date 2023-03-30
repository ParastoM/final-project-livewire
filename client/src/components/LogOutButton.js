import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogOutButton = () => {
  const { logout } = useAuth0();
  return <Button onClick={() => logout()}>Log Out</Button>;
};

const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  font-family: "VCR OSD Mono";
  color: white;

  &:hover {
    color: #ff00d4;
  }
`;

export default LogOutButton;
