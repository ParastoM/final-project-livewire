import styled from "styled-components";

const Footer = () => {
  //add to footer social media logos
  return (
    <>
      <Container>
        <Text>About</Text>
        <Text>Contact Info</Text>
        <Text>Follow Us</Text>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  height: 10vh;
  font-family: "VCR OSD Mono";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Text = styled.span`
  font-weight: bold;
  padding-left: 50px;
  padding-right: 50px;
`;

export default Footer;
