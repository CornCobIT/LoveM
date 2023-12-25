import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2QN9CNDbFQcjiloCoZxKNo9otx_vokF8",
  authDomain: "lovem-c1e24.firebaseapp.com",
  projectId: "lovem-c1e24",
  storageBucket: "lovem-c1e24.appspot.com",
  messagingSenderId: "1011548720063",
  appId: "1:1011548720063:web:f293d951d36813997faf0a",
  measurementId: "G-Q8Q9CMTJSL",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
