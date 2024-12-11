import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, sendPasswordResetEmail,setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA09FwqRu2Wle_yl-AGPMQMEK1XNz2Wtfk",
    authDomain: "authetication-75858.firebaseapp.com",
    projectId: "authetication-75858",
    storageBucket: "authetication-75858.firebasestorage.app",
    messagingSenderId: "695020443839",
    appId: "1:695020443839:web:e0aac9bbce193d6e3b4e0a",
    measurementId: "G-MJVPGJSE7R",
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
export const auth = getAuth(app);
export const sendOTP = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "OTP sent to your email." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
setPersistence(auth,browserLocalPersistence);
export{db};
