import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../context/Firebase";
import { UserContext } from "../../context/UserContext";
import UserModal from "./UserModal";
import logo from "../../images/sophieLogo.png";

import { TheHeader, HeaderContainer, LoginButton } from "../StyledComponents";

const Header = () => {
  const firebase = useContext(FirebaseContext);
  const { user, userDispatch } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const handleLogout = () => {
    firebase.logout();
    userDispatch({ type: "LOGOUT_USER" });
  };

  return (
    <TheHeader>
      <HeaderContainer>
        <img
          src={logo}
          style={{
            height: "75px",
            marginRight: "20px",
            alignSelf: "center",
            margin: "auto 10px auto auto",
            borderRadius: "5px",
            boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
          }}
          alt=""
        />
        <h1 style={{ margin: 0, color: "white" }}>Feelin' like Yoga</h1>

        <div style={{ color: "lightgray", textAlign: "right" }}>
          {Object.keys(user).length > 1 ? user.displayName : ""}
        </div>

        {Object.keys(user).length ? (
          <LoginButton
            style={{ justifySelf: "end" }}
            inverse
            onClick={handleLogout}
          >
            Logout
          </LoginButton>
        ) : (
          <LoginButton
            style={{ justifySelf: "end" }}
            inverse
            onClick={() => setModal(true)}
          >
            Login
          </LoginButton>
        )}
      </HeaderContainer>
      {modal && <UserModal setModal={setModal} />}
    </TheHeader>
  );
};

export default Header;
