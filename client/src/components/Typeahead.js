//Started this component with the intent of it being a typeahead with suggestions being fetched from my collection in MongoDB.
//It has a search only functionality for now. Something to work on :-)
// The code is commented out at the bottom of the component.

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Typeahead = () => {
  const [value, setValue] = useState("");
  const [artistName, setArtistName] = useState("");

  const navigate = useNavigate();

  const artistEvents = () => {
    fetch(`/artists/${value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        navigate("/artistdetails", {
          state: { artist: data.data },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelect = (value) => {
    setArtistName(value);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search for an artist to see their upcoming events"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            handleSelect(ev.target.value);
          }
        }}
      />

      {artistName && (
        <div>
          <div>{artistName.name}</div>
        </div>
      )}

      <Button onClick={() => artistEvents()}>Wired</Button>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 60px;
`;
const Button = styled.button`
  background-color: #ff00d4;
  color: white;
  border-radius: 3px;
  border: none;
  width: 75px;
  height: 30px;

  &:focus {
    outline: solid black 3px;
  }
`;
const Input = styled.input`
  width: 400px;
  margin-right: 20px;
  height: 30px;

  &:focus {
    border: solid blue 3px;
  }
`;
export default Typeahead;

// some code for typeahead

// const [artistList, setArtistList] = useState([]);

// useEffect(() => {
//   fetch(`/artistList`)
//     .then((response) => response.json())
//     .then((data) => {
//       const stringArray = data.data.map((obj) => obj.name);
//       console.log(stringArray);
//       setArtistList(stringArray);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }, []);
// console.log(artistList);
// const matchedSuggestions =
//   value.length >= 2
//     ? artistList.filter((artist) => {
//         return artist.toLowerCase().includes(value.toLowerCase());
//       })
//     : [];
// console.log("matchedSuggestions", matchedSuggestions);

{
  /* <ul>
        {matchedSuggestions.map((artist) => (
          <li key={artist}>{artist.toLowerCase()}</li>
        ))}
      </ul> */
}
