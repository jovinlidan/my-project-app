import firebase from "firebase/app";
import * as admin from "firebase-admin";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAPg8puHNM7zOIs3kaANcPFXVF_uGjk-Cs",
  authDomain: "jopp-project-app.firebaseapp.com",
  projectId: "jopp-project-app",
  storageBucket: "jopp-project-app.appspot.com",
  messagingSenderId: "25196125283",
  appId: "1:25196125283:web:2a48fc1677ad92adbfac56",
  measurementId: "G-G400ZF22EP",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();
export { storage, database, auth, firebase as default };
