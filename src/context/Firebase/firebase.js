import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIRBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MS_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    try {
      firebase.initializeApp(config);
    } catch (err) {
      if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
      }
    }

    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  manualLogin = async (email, password) => {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    const user = await result.user.toJSON();

    try {
      const userSignups = await this.db
        .collection("signups")
        .where("userId", "==", user.uid)
        .get();

      user.classes = userSignups.docs.map((doc) => {
        return {
          ...doc.data(),
          enrollmentId: doc.id,
        };
      });
    } catch (classError) {
      console.error("THERE WAS AN ERROR");
      console.error(classError);
    }

    return user;
  };

  googleLogin = async () => {
    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      const result = await this.auth.signInWithPopup(provider);

      const user = result.user.toJSON();

      try {
        const userSignups = await this.db
          .collection("signups")
          .where("userId", "==", user.uid)
          .get();

        user.classes = userSignups.docs.map((doc) => {
          return {
            ...doc.data(),
            enrollmentId: doc.id,
          };
        });
      } catch (classError) {
        console.error("THERE WAS AN ERROR");
        console.error(classError);
      }

      return user;
    } catch (loginError) {
      console.error("THERE WAS AN ERROR");
      console.error(loginError);
    }
  };

  createUser = (userData) => {
    return this.auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: userData.displayName,
        });
      })
      .then(() => {
        const user = this.auth.currentUser.toJSON();
        user.classes = [];
        return user;
      });
  };

  logout = () => {
    this.auth.signOut().then(() => console.log("Logged Out"));
  };

  addClass = (classId, userId) => {
    return this.db
      .collection("signups")
      .add({
        classId,
        userId,
        paid: false,
      })
      .catch(console.error);
  };

  dropClass = (enrollmentId) => {
    return this.db
      .collection("signups")
      .doc(enrollmentId)
      .delete()
      .then(() => console.log(`User dropped course -> ${enrollmentId}`))
      .catch(console.error);
  };
}

export default Firebase;
