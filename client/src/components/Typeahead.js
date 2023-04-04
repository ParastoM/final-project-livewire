import { useEffect, useState } from "react";
import styled from "styled-components";

const Typeahead = () => {
  const [value, setValue] = useState("");
  const [artistName, setArtistName] = useState("");

  const artistEvents = () => {
    console.log(value);
    fetch(`/events/${value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArtistName(data);
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
      {/* <form onSubmit={handleSubmited}> */}
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
      {/* </form> */}
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

  &:focus {
    border: solid blue 3px;
  }
`;
export default Typeahead;

// const handleSubmited = (e) => {
//   e.preventDefault();
//   fetch(`/events/${value}`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       setArtistName(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
