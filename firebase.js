// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD5f4pJMkvYXDcehlJIhewGpy0QiOMpHio",
  authDomain: "clone-8a961.firebaseapp.com",
  projectId: "clone-8a961",
  storageBucket: "clone-8a961.appspot.com",
  messagingSenderId: "931703586382",
  appId: "1:931703586382:web:9178a945362433abd18d1f",
  measurementId: "G-KK47Z5B3B5",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
