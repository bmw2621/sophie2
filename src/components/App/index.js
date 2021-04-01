import React, { useContext, useState, useMemo } from "react";
import { FirebaseContext } from "../../context/Firebase";

import Layout from "../Layout";
import AppCards from "../AppCards";
import "./App.css";
import Logo from "../../images/sophieLogo.png";

function App() {
  const [classes, setClasses] = useState([]);
  const firebase = useContext(FirebaseContext);

  useMemo(
    () =>
      firebase.db
        .collection("classes")
        .orderBy("start")
        .get()
        .then((classes) => setClasses(classes.docs))
        .catch(console.error),

    [firebase.db]
  );

  return (
    <Layout>
      {/* <AppCards yogaClasses={classes} /> */}
      <div
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "200px",
        }}
      >
        <img alt={"logo"} src={Logo} style={{ marginTop: "-50px" }} />
        <span
          style={{
            fontFamily: "Salted Mocha",
            color: "white",
            textShadow: "5px 5px 10px rgba(0,0,0,0.5)",
            // fontWeight: "600",
            fontSize: "9vw",
            margin: "30px 0",
          }}
        >
          Feelin' Like Yoga
        </span>
      </div>
      {classes && <AppCards yogaClasses={classes} />}
    </Layout>
  );
}

export default App;
