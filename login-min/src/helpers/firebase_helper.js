import firebase from "firebase/compat/app";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";

// import default_avatar from "../assets/images/default_avatar.jpg";

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Initialize Firebase
      const app = firebase.initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              const userData = snapshot.data();
              const user2 = { userData, user };
              // sessionStorage.setItem("authUser", JSON.stringify(user2));
            });
        } else {
          // sessionStorage.removeItem("authUser");
        }
      });
    }
  }

  /**
   * forget Password user with given details
   */
  forgetPassword = (email) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!sessionStorage.getItem("authUser")) return null;
    return JSON.parse(sessionStorage.getItem("authUser"));
  };

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }

  getFirebase = () => {
    return firebase;
  };
}

let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config) => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

const getFirebase = () => {
  return _fireBaseBackend.firebase;
};
export { initFirebaseBackend, getFirebaseBackend };
