import styled from "styled-components";

const About = () => {
  return (
    <div>
      <Text>
        Livewire is an application I worked on as my final project for
        Concordia's Full Stack Web Development Bootcamp. The idea was to create
        a space that serves as a search tool for concerts, as a personal event
        keeper / organizer, and as a small community where users can interact
        with one another. It was an opportunity for me to go back in time to the
        year 2005 - being a teen, having a MySpace account, downloading songs
        (and viruses) from LimeWire onto the family computer, keeping all my
        concert ticket stubs, and having music be the entirety of my life.{" "}
      </Text>
      <Text>
        {" "}
        The project is a work-in-progress. Here are some of the things I will
        hopefully be crossing off of my ever-growing list:
        <Ul>
          <Li>Add an edit button for user comments</Li>
          <Li>Enable users to "unattend" events</Li>
          <Li>Display a user's avatar on their profile / header</Li>
          <Li>
            Re-design the buttons for the random events generated on the
            homepage, and on an artist's page
          </Li>
          <Li>
            Design the events a user will be attending to look like ticket stubs
          </Li>
          <Li>
            Archive a user's attended events so that they can always go back and
            look at them
          </Li>
        </Ul>
      </Text>
    </div>
  );
};

const Li = styled.li`
  ::before {
    content: "•"; /* Add the dot as content */
    margin-right: 0.5rem; /* Add margin to space the dot from the text */
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
  margin-left: 3vw;
`;

const Text = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5vh;
  margin-left: 30vw;
  margin-right: 30vw;
  margin-bottom: 5vh;
  line-height: 1.5;
`;

export default About;
