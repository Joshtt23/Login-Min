import React from "react";
import Route from "./Routes";
import { initFirebaseBackend } from "./helpers/firebase_helper";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

initFirebaseBackend(firebaseConfig);

// Initialize Firebase

function App() {
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
