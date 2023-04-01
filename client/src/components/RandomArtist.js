import styled from "styled-components";
import { Link } from "react-router-dom";

const RandomArtist = ({ artist }) => {
  const backgroundImageUrl = artist.image_url;
  return (
    <Container>
      <Link to="/artistdetails">
        <CardWrapper backgroundImageUrl={backgroundImageUrl}>
          <Text>
            <h2>{artist.name}</h2>

            <p>{artist.upcoming_event_count} upcoming shows</p>
            <p>See all tour dates</p>
          </Text>
        </CardWrapper>
      </Link>
    </Container>
  );
};
const StyledLink = styled(Link)``;
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardWrapper = styled.div`
  border: 1px solid black;
  color: white;
  margin-right: 10px;
  padding: 10px;
  height: 200px;
  width: 350px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImageUrl});
  position: relative;
  &:hover {
    color: #ff00d4;
  }
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
`;

export default RandomArtist;
