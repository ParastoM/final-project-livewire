import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

import moment from "moment";

const SingleEvent = (props) => {
  const [newComment, setNewComment] = useState("");
  const [oldComments, setOldComments] = useState([]);
  const [deletedComment, setDeletedComment] = useState("");
  const [IsComment, setIsComment] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [characterCount, setcharacterCount] = useState(280);
  const { state } = useLocation();
  const { event, artist } = state;
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    fetch(`/get-comment/${state.event.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOldComments(data.data);
      });
  }, [state.event.id, IsComment]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user/events/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserEvents(data.data.events);
        });
    }
  }, [isAuthenticated]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setcharacterCount(280 - e.target.value.length);
  };

  const attendingHandler = () => {
    fetch("/user/events", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        id: state.event.id,
        artistName: state.event.lineup[0],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201 || 200) {
          window.alert("Event added, thanks for attending!");
        }
      });
  };

  const sendComment = (e) => {
    console.log("sending comment");
    e.preventDefault();
    fetch("/post-comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        eventId: state.event.id,
        comment: newComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setIsComment(!IsComment);
          setNewComment("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteComment = (e, commentId) => {
    console.log("Deleting comment with id:", commentId);
    fetch("/delete-comment", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        commentId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          window.alert("Comment deleted!");
          setOldComments(
            oldComments.filter((comment) => comment._id !== commentId)
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log("oldComments", oldComments);

  return (
    <Container>
      <Section>
        {state ? (
          event && (
            <EventInfo>
              <P>
                <Main>{event.lineup[0]}</Main>
                {event.lineup[1] && (
                  <With>
                    {" "}
                    with <Feat>{event.lineup[1]}</Feat>
                  </With>
                )}
              </P>
              <P>{event.venue.name}</P>
              <P>{event.venue.street_address}</P>
              <P>{event.venue.location}</P>
              <P>
                {moment.utc(event.datetime).format("MMM Do, YYYY · h:mm A  ")}{" "}
              </P>
            </EventInfo>
          )
        ) : (
          <div>No Selected Event!</div>
        )}
        {isAuthenticated && event && (
          <ButtonGoing
            disabled={userEvents.find(
              (element) => element.id === state.event.id
            )}
            onClick={attendingHandler}
          >
            {userEvents.find((element) => element.id === state.event.id)
              ? "Already attending!"
              : "I'll be there!"}
          </ButtonGoing>
        )}
        <Form onSubmit={sendComment}>
          <TextArea
            type="text"
            id="comment"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              setcharacterCount(280 - e.target.value.length);
            }}
            maxLength={400}
            placeholder="Looking forward to it? Share a comment!"
          />

          <ButtonCount>
            <StyledLimitNumber characterCount={characterCount}>
              {characterCount}
            </StyledLimitNumber>

            <Button
              type="submit"
              disabled={characterCount >= 280 || characterCount < 0}
            >
              LiveWire
            </Button>
          </ButtonCount>
        </Form>
      </Section>
      <SectionSection>
        {oldComments.map((item) => {
          return (
            <>
              <OldCommentDiv>
                <p>Posted by {item.email}</p>
                <Comment>{item.comment}</Comment>

                {isAuthenticated && item.email === user.email && (
                  <EditDeleteButtons>
                    <button
                      onClick={(e) => {
                        deleteComment(e, item._id);
                      }}
                    >
                      Delete
                    </button>
                  </EditDeleteButtons>
                )}
              </OldCommentDiv>
            </>
          );
        })}
      </SectionSection>
    </Container>
  );
};
const FormEdit = styled.form`
  position: absolute;
`;
const Comment = styled.p`
  word-wrap: break-word;
`;

const EditDeleteButtons = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const Section = styled.div``;

const SectionSection = styled.div`
  margin-left: 50px;
`;
const OldCommentDiv = styled.div`
  border: 1px solid black;
  width: 500px;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

const With = styled.div`
  margin-left: 70px;
`;

const Feat = styled.span`
  font-size: 25px;
  font-weight: bold;
`;

const ButtonGoing = styled.button`
  background-color: #ff00d4;
  color: white;
  border-radius: 3px;
  border: none;
  width: 150px;
  height: 30px;

  &:hover {
    outline: solid black 2px;
  }
`;

const EventInfo = styled.div`
  width: 500px;
  height: auto;
`;

const P = styled.p`
  margin-bottom: 5px;
`;

const Container = styled.div`
  margin: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const Main = styled.span`
  font-weight: bold;
  font-size: 40px;
`;

const Form = styled.form`
  margin-top: 20px;
  outline: 1px solid;
  border-radius: 10px;
  height: 200px;
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.button`
  color: #ff00d4;
  padding: 10px;
  border-radius: 20px;
  font-weight: bold;
  margin-left: 20px;
  opacity: 1;
  &:disabled {
    opacity: 0.5;
  }
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  width: 400px;
  height: 150px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  word-wrap: break-word;
`;

const ButtonCount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const StyledLimitNumber = styled.span`
  color: ${(props) =>
    props.characterCount < 0
      ? "red"
      : props.characterCount <= 55
      ? "yellow"
      : "black"};
`;

export default SingleEvent;

//Below is a start to the code to edit comments.

// const [editOpen, setEditOpen] = useState(false);
// const [editCommentId, setEditCommentId] = useState("");
// const [updatedComment, setUpdatedComment] = useState("");

// const reRender = () => {
//   console.log("hello");
//   fetch(`/get-comment/${state.event.id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("test", data.data);
//       setOldComments(data.data);
//     });
// };

// const editComment = (e, commentId) => {
//   e.preventDefault();
//   fetch("/edit-comment", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: user.email,
//       commentId,
//       comment: updatedComment,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.status === 201) {
//         setIsComment(!IsComment);
//         setNewComment("");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

//Below is the return for the Edit functionality

/* <button
                      onClick={() => {
                        setEditOpen(!editOpen);
                        setEditCommentId(item._id);
                      }}
                    >
                      Edit
                    </button>
                    {editOpen && item._id === editCommentId && (
                      <FormEdit
                        onSubmit={(e) => {
                          editComment(e, item._id);
                        }}
                      >
                        <textarea
                          onChange={(e) => {
                            setUpdatedComment(e.target.value);
                          }}
                        ></textarea>
                        <button> Update</button>
                      </FormEdit>
                    )} */
