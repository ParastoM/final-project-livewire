import styled from "styled-components";

const RandomArtist = ({ artist }) => {
  return (
    <Container>
      <CardWrapper>
        <h2>{artist.name}</h2>
        {/* <img src={artist.image_url} /> */}
        <button>See all tour dates</button>
      </CardWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardWrapper = styled.div`
  border: 1px solid black;
  margin-right: 10px;
  padding: 10px;
`;
export default RandomArtist;
