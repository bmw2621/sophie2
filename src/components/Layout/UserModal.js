import React, { useState, useContext, useReducer } from "react";
import { FirebaseContext } from "../../context/Firebase";
import { UserContext } from "../../context/UserContext";
import verifyData from "../../utils/validateNewUserData";

import {
  ModalBG,
  LoginModal,
  ModalExit,
  LoginButton,
  LoginInput,
} from "../StyledComponents";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DISPLAY_NAME":
      return { ...state, displayName: action.payload };
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_EMAIL_CONF":
      return { ...state, emailConf: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_PASSWORD_CONF":
      return { ...state, passwordConf: action.payload };
    default:
      return state;
  }
};

const initialState = {
  displayName: "",
  email: "",
  emailConf: "",
  password: "",
  passwordConf: "",
  phoneNumber: "",
};

const UserModal = ({ setModal }) => {
  const firebase = useContext(FirebaseContext);
  const { userDispatch } = useContext(UserContext);
  const [createUser, setCreateUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [signUpFormData, formDispatch] = useReducer(reducer, initialState);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleGoogleLogin = () => {
    firebase
      .googleLogin()
      .then((user) => userDispatch({ type: "LOAD_USER", userData: user }))
      .catch(console.error);

    setModal(false);
  };

  const handleManualLogin = () => {
    firebase
      .manualLogin(userEmail, userPassword)
      .then((user) => {
        userDispatch({ type: "LOAD_USER", userData: user });
        setModal(false);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/wrong-password":
            document.getElementById("password").style.border = "2px solid red";
            if (failedAttempts + 1 >= 3) {
              alert(
                "Too many failed attempts, please try another login method"
              );
            } else {
              alert(
                `Incorrect password\n${2 - failedAttempts} attempts remaining`
              );
            }
            break;
          case "auth/invalid-email":
            if (failedAttempts + 1 >= 3) {
              document.getElementById("email").style.border = "2px solid red";
              alert(
                "Too many failed attempts, please try another login method"
              );
            } else {
              alert(`Invalid email\n${2 - failedAttempts} attempts remaining`);
            }
            break;
          default:
            alert(
              `There was an error\n${2 - failedAttempts} attempts remaining`
            );
        }

        setFailedAttempts(failedAttempts + 1);
      });
  };

  const handleCreateNewAccount = () => {
    const isValid = verifyData(signUpFormData);
    if (isValid) {
      firebase
        .createUser(signUpFormData)
        .then((userData) => {
          setModal(false);
          userDispatch({ type: "LOAD_USER", userData });
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            document.getElementById("email").style.border = "2px solid red";
            alert("Email already in use");
          }
        });
    } else {
      console.log("You suck");
    }
  };

  return (
    <ModalBG>
      <LoginModal>
        <ModalExit onClick={() => setModal(false)}>X</ModalExit>
        {!createUser && (
          <>
            <h1>Login</h1>
            <LoginInput
              type="text"
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
            />
            <LoginInput
              type="password"
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              style={{
                color: "gray",
                fontStyle: "italic",
                border: "none",
                background: "none",
                textDecoration: "underline",
              }}
              onClick={() => setCreateUser(true)}
            >
              Create Account
            </button>

            <LoginButton
              onClick={handleManualLogin}
              disabled={failedAttempts >= 3}
            >
              Email Login
            </LoginButton>
            <LoginButton onClick={handleGoogleLogin}>Google Login</LoginButton>
          </>
        )}
        {createUser && (
          <>
            <h3>Create New Account</h3>
            <LoginInput
              id="displayName"
              type="text"
              onChange={(e) =>
                formDispatch({
                  type: "UPDATE_DISPLAY_NAME",
                  payload: e.target.value,
                })
              }
              placeholder="Full Name"
            />
            <LoginInput
              id="email"
              type="text"
              onChange={(e) =>
                formDispatch({
                  type: "UPDATE_EMAIL",
                  payload: e.target.value,
                })
              }
              placeholder="Email"
            />
            <LoginInput
              id="emailConf"
              type="text"
              onChange={(e) =>
                formDispatch({
                  type: "UPDATE_EMAIL_CONF",
                  payload: e.target.value,
                })
              }
              placeholder="Confirm Email"
            />
            <LoginInput
              id="password"
              type="password"
              onChange={(e) =>
                formDispatch({
                  type: "UPDATE_PASSWORD",
                  payload: e.target.value,
                })
              }
              placeholder="Password"
            />
            <LoginInput
              id="passwordConf"
              type="password"
              onChange={(e) =>
                formDispatch({
                  type: "UPDATE_PASSWORD_CONF",
                  payload: e.target.value,
                })
              }
              placeholder="Confirm Password"
            />
            <LoginButton
              style={{ marginTop: "30px" }}
              onClick={handleCreateNewAccount}
            >
              Create Account
            </LoginButton>
          </>
        )}
      </LoginModal>
    </ModalBG>
  );
};

export default UserModal;
