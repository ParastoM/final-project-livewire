import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RandomArtist = ({ artist }) => {
  const backgroundImageUrl = artist.image_url;
  const navigate = useNavigate();

  const handleClick = (ev) => {
    ev.preventDefault();
    navigate("/artistdetails", { state: { artist: artist } });
  };

  return (
    <Container>
      <Button onClick={(ev) => handleClick(ev)}>
        <CardWrapper backgroundImageUrl={backgroundImageUrl}>
          <Text>
            <h2>{artist.name}</h2>

            <p>{artist.upcoming_event_count} upcoming shows</p>
            <p>See all tour dates</p>
          </Text>
        </CardWrapper>
      </Button>
    </Container>
  );
};
const StyledLink = styled(Link)``;
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardWrapper = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border: 1px solid black;
  color: white;
  margin-right: 10px;
  padding: 10px;
  height: 300px;
  width: 350px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImageUrl});
  position: relative;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-weight: bold;
  &:hover {
    background: #ff00d4;
    width: 330px;
    padding-right: 5px;
  }
`;

const Button = styled.button`
  all: unset;
`;

export default RandomArtist;
