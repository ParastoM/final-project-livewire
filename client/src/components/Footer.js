import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  //add to footer social media logos
  return (
    <>
      <Container>
        <Links to="/about">About</Links>
        <Text>Contact Info</Text>
      </Container>
    </>
  );
};

const Links = styled(Link)`
  font-weight: bold;
  padding-left: 100px;
  padding-right: 100px;
  font-size: 25px;
  color: white;
  &:hover {
    color: #ff00d4;
  }
`;

const Container = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  height: 8vh;
  font-family: "VCR OSD Mono";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Text = styled.span`
  font-weight: bold;
  padding-left: 100px;
  padding-right: 100px;
  font-size: 25px;
`;

export default Footer;
