import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2ptfrFzTy5lMKle6E97snzSDSk56hExs",
  authDomain: "lovem-415cd.firebaseapp.com",
  projectId: "lovem-415cd",
  storageBucket: "lovem-415cd.appspot.com",
  messagingSenderId: "659559875066",
  appId: "1:659559875066:web:6ff43d9307052774bca443",
  measurementId: "G-QTP5FP4W4H",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
