// // import firebase from "firebase/app";
// import "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// // const config = require('./firebaseConfig.json');
// // const firebaseConfig = config
// const config = {
//     apiKey: "AIzaSyACOl3OJgiJpk5luBai21eY1TVhHq3gOSo",
//     authDomain: "mapswithnestjs.firebaseapp.com",
//     projectId: "mapswithnestjs",
//     storageBucket: "mapswithnestjs.appspot.com",
//     messagingSenderId: "579480671622",
//     appId: "1:579480671622:web:64eec2469c4cff8a0dc807",
//     measurementId: "G-Q87M89KWXW"
//   };


// firebase.initializeApp(config);

// const auth = firebase.auth();

// export { auth, firebase };
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import userStore from "./store/userStore";
import { Roles, User } from "./utils/modals";
// import * as dotenv from "dotenv"
// const dotenv = require('dotenv');
// dotenv.config();
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACOl3OJgiJpk5luBai21eY1TVhHq3gOSo",
    authDomain: "mapswithnestjs.firebaseapp.com",
    projectId: "mapswithnestjs",
    storageBucket: "mapswithnestjs.appspot.com",
    messagingSenderId: "579480671622",
    appId: "1:579480671622:web:64eec2469c4cff8a0dc807",
    measurementId: "G-Q87M89KWXW"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email:string, password:string) => {
  try {
    debugger
    const res=await signInWithEmailAndPassword(auth, email, password);
    debugger
    const user=res.user;
    debugger
    return user;
  } catch (err) {
    debugger
    alert(err);
  }
};
const registerWithEmailAndPassword = async (name:string, email:string, password:string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email:string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const logout = async() => {
 await signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
