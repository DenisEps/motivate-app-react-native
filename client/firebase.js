import * as firebase from "firebase";
import "@firebase/firestore";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5KTGvd0cg70fwt8Cu9QYN3IDNSNWt41s",
  authDomain: "elbrus-motivator.firebaseapp.com",
  databaseURL: "https://elbrus-motivator.firebaseio.com",
  projectId: "elbrus-motivator",
  storageBucket: "elbrus-motivator.appspot.com",
  messagingSenderId: "331031432009",
  appId: "1:331031432009:web:cbbad555f7b02533c76898",
  measurementId: "G-K8X0TWLPB2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
