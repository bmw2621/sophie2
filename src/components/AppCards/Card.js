import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import { FirebaseContext } from "../../context/Firebase";

import { CardContainer, Button } from "../StyledComponents";

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

const Card = ({ data, enrollment, index }) => {
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
    <CardContainer index={index}>
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
