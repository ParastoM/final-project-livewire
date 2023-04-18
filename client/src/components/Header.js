import styled from "styled-components";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // psuh the user to the database
      fetch("/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
  }, [isAuthenticated]);

  console.log("user", user);
  return (
    <Container>
      <Logo to="/">LiveWire</Logo>
      <Buttons>
        {user && isAuthenticated ? (
          <ProfileButton to="/profile">{user.nickname}'s Profile</ProfileButton>
        ) : (
          ""
        )}{" "}
        {user && isAuthenticated ? (
          <span>
            // <LogOutButton />
          </span>
        ) : (
          <LogInButton />
        )}
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  font-family: "VCR OSD Mono";
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  height: 80px;
  background-color: black;
  color: white;
`;
const ProfileButton = styled(Link)`
  border: none;
  outline: none;
  background: none;
  font-family: "VCR OSD Mono";
  color: white;
  font-size: 20px;

  &:hover {
    color: #ff00d4;
  }
`;

const Logo = styled(Link)`
  font-size: 50px;
  padding-left: 40px;
  color: white;
  &:hover {
    color: #ff00d4;
  }
`;

const Buttons = styled.div``;

export default Header;
