// import firebase from "firebase/app";
import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// const config = require('./firebaseConfig.json');
// const firebaseConfig = config
const config = {
    apiKey: "AIzaSyACOl3OJgiJpk5luBai21eY1TVhHq3gOSo",
    authDomain: "mapswithnestjs.firebaseapp.com",
    projectId: "mapswithnestjs",
    storageBucket: "mapswithnestjs.appspot.com",
    messagingSenderId: "579480671622",
    appId: "1:579480671622:web:64eec2469c4cff8a0dc807",
    measurementId: "G-Q87M89KWXW"
  };

firebase.initializeApp(config);

const auth = firebase.auth();

export { auth, firebase };
