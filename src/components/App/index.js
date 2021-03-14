import React, { useContext, useState, useMemo } from "react";
import { FirebaseContext } from "../../context/Firebase";

import Layout from "../Layout";
import AppCards from "../AppCards";
import "./App.css";

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
      <AppCards yogaClasses={classes} />
    </Layout>
  );
}

export default App;
