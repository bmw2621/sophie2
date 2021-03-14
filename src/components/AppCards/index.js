import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

import Card from "./Card";

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-auto-rows: 350px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const AppCards = ({ yogaClasses }) => {
  const { user } = useContext(UserContext);
  const [userClasses, setUserClasses] = useState([]);

  useEffect(() => {
    if (user?.classes) {
      setUserClasses(
        user.classes.map((yogaClass) => {
          return {
            classId: yogaClass.classId,
            enrollmentId: yogaClass.enrollmentId,
          };
        })
      );
    }
  }, [user]);

  return (
    <CardsContainer>
      {yogaClasses.map((classData, i) => (
        <Card
          key={classData.id}
          data={classData}
          enrollment={userClasses.filter(
            (yogaClass) => yogaClass.classId === classData.id
          )}
          index={i}
        />
      ))}
    </CardsContainer>
  );
};

export default AppCards;
