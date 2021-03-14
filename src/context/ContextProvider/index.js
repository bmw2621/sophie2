import Firebase, { FirebaseContext } from "../Firebase";
import UserContext from "../UserContext";

const ContextProvider = ({ children }) => (
  <UserContext>
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  </UserContext>
);

export default ContextProvider;
