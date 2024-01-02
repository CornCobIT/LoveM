import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/database";


const firebaseConfig = {
  apiKey: "AIzaSyAtAJYWTddvPSjj_t7vDueZJAu3Jy0e0QE",
  authDomain: "project-e086d.firebaseapp.com",
  projectId: "project-e086d",
  storageBucket: "project-e086d.appspot.com",
  messagingSenderId: "631947718365",
  appId: "1:631947718365:web:b6cf5e5d65c7d7bd66b534"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();
