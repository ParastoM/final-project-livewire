// import React from "react";
// import styled from "styled-components";
// import { useState, useEffect } from "react";

// // users should be able to comment when logged in.
// // users should be able to edit / delete their comment once it's been posted, but only their own comments (patch / delete)
// // users should be able to see of all comments on an event

// const EventFeed = () => {
//   const [newComment, setNewComment] = useState("");
//   const [commentData, setCommentData] = useState(null);
//   const [characterCount, setcharacterCount] = useState(280);
//   const [error, setError] = useState(false);

//   const FetchFunction = () => {
//     fetch("")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === 400 || data.status === 500) {
//           throw new Error("Error");
//         }
//         // const tweetArray = Object.values(data.tweetsById);
//         // setTweetData(data);
//         // setStatus("idle");
//       })
//       .catch((error) => {
//         setError(true);
//       });
//   };
//   useEffect(() => {
//     FetchFunction();
//   }, []);

//   const onChangeHandler = (e) => {
//     e.preventDefault();
//     setcharacterCount(280 - e.target.value.length);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("", {
//       method: "POST",
//       body: JSON.stringify({ status: newComment }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === 400 || data.status === 500) {
//           throw new Error("Error");
//         }
//         setNewComment("");
//         FetchFunction();
//       })
//       .catch((error) => {
//         setError(true);
//       });
//   };

//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <TextArea
//           type="text"
//           id="comment"
//           value={newComment}
//           onChange={(e) => {
//             setNewComment(e.target.value);
//             setcharacterCount(280 - e.target.value.length);
//           }}
//           maxLength={400}
//           placeholder="What's on your mind?"
//         />

//         <ButtonCount>
//           <StyledLimitNumber characterCount={characterCount}>
//             {characterCount}
//           </StyledLimitNumber>

//           <Button
//             type="submit"
//             disabled={characterCount >= 280 || characterCount < 0}
//           >
//             HELLO
//           </Button>
//         </ButtonCount>
//       </Form>
//     </div>
//   );
// };

// const Button = styled.button`
//   color: black;
//   padding: 10px;
//   border-radius: 20px;
//   font-weight: bold;
//   margin-left: 20px;
//   opacity: 1;
//   &:disabled {
//     opacity: 0.5;
//   }
// `;

// const Form = styled.form`
//   outline: 1px solid gray;
//   border-radius: 10px;
//   height: 200px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const TextArea = styled.textarea`
//   border: none;
//   outline: none;
//   resize: none;
//   width: 60vw;
//   height: 150px;
//   font-family: Arial, Helvetica, sans-serif;
//   font-size: 16px;
//   display: flex;
//   margin-top: 5px;
//   margin-left: 5px;
//   margin-right: 5px;
//   //word-wrap: break-word;
// `;

// const ButtonCount = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   margin-bottom: 5px;
//   margin-right: 5px;
// `;

// const StyledLimitNumber = styled.span`
//   color: ${(props) =>
//     props.characterCount < 0
//       ? "red"
//       : props.characterCount <= 55
//       ? "yellow"
//       : "black"};
// `;

// export default EventFeed;
