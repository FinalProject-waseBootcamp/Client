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
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
    // measurementId: "G-3WW4Y70EEF"
};

alert("environment: "+process.env.NODE_ENV)

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
