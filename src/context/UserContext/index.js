import React, { useReducer } from "react";

export const UserContext = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return action.userData;
    case "LOGOUT_USER":
      return {};
    case "DROP_CLASS":
      return {
        ...state,
        classes: [
          ...state.classes.filter(
            (yogaClass) => yogaClass.enrollmentId !== action.enrollmentId
          ),
        ],
      };
    case "ADD_CLASS":
      const tempState = { ...state };
      tempState.classes.push(action.enrollment);
      return tempState;
    default:
      throw new Error("User Action Type does not exist");
  }
};

const UserContextWrapper = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, {});
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;
