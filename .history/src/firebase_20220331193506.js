// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqsezhnAkZam6rp0Sx4eWh7ETy3ak0Sg4",
  authDomain: "todo-d02d3.firebaseapp.com",
  projectId: "todo-d02d3",
  storageBucket: "todo-d02d3.appspot.com",
  messagingSenderId: "165389523424",
  appId: "1:165389523424:web:978f416b3724c4db547385"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = get();

export default firebase;