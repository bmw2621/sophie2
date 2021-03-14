import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../../context/UserContext";
import { FirebaseContext } from "../../context/Firebase";

const CardContainer = styled.div`
  width: 280px;
  height: 350px;
  justify-self: center;
  display: grid;
  grid-template-row: repeat(3, 1fr);
  padding: 30px;
  border: 1px solid lightgray;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  & * {
    margin: 0;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 2rem;
  background: ${(props) => (props.disabled ? "lightgray" : "var(--primary)")};
  align-self: end;
  justify-self: center;
  color: ${(props) => (props.disabled ? "darkgray" : "white")};
  border: 0;
  border-radius: 5px;
`;

const formatTimeString = (startDateObj, endDateObj) => {
  return `${startDateObj.getHours() % 12}:${
    startDateObj.getMinutes() < 10
      ? "0" + startDateObj.getMinutes()
      : startDateObj.getMinutes()
  } - ${endDateObj.getHours() % 12}:${
    endDateObj.getMinutes() < 10
      ? "0" + endDateObj.getMinutes()
      : endDateObj.getMinutes()
  } ${endDateObj.getHours() > 11 ? "AM" : "PM"}`;
};

const Card = ({ data, enrollment }) => {
  const firebase = useContext(FirebaseContext);
  const { user, userDispatch } = useContext(UserContext);
  const yogaClass = data.data();
  const startTime = yogaClass.start.toDate();
  const endTime = yogaClass.end.toDate();
  const timeStr = formatTimeString(startTime, endTime);

  const handleDropClass = (enrollmentId) =>
    firebase.dropClass(enrollmentId).then(() => {
      userDispatch({ type: "DROP_CLASS", enrollmentId });
    });

  const handleAddClass = () =>
    firebase
      .addClass(data.id, user.uid)
      .then((docRef) =>
        userDispatch({
          type: "ADD_CLASS",
          enrollment: {
            userId: user.id,
            classId: data.id,
            paid: false,
            enrollmentId: docRef.id,
          },
        })
      )
      .catch(console.error);

  return (
    <CardContainer>
      <h1 style={{ textAlign: "center", alignSelf: "center" }}>
        {yogaClass.title}
      </h1>
      <div style={{ alignSelf: "center" }}>
        <p>{yogaClass.location}</p>
        <p style={{ fontStyle: "italic", color: "#777" }}>
          {yogaClass.start.toDate().toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p style={{ fontStyle: "italic", color: "#777" }}>{timeStr}</p>
        <p>{"$" + yogaClass.cost}</p>
      </div>
      {Object.keys(user).length === 0 ? (
        <Button disabled={true}>Sign Up</Button>
      ) : enrollment.length > 0 ? (
        <Button onClick={() => handleDropClass(enrollment[0].enrollmentId)}>
          Drop Class
        </Button>
      ) : (
        <Button onClick={handleAddClass}>Sign Up</Button>
      )}
    </CardContainer>
  );
};

export default Card;
