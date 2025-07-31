import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBh70OdBhWJ-Wq7UpEaArgOgkyNe4onKb0",
    authDomain: "braindeck-29e67.firebaseapp.com",
    projectId: "braindeck-29e67",
    storageBucket: "braindeck-29e67.firebasestorage.app",
    messagingSenderId: "257041262009",
    appId: "1:257041262009:web:3679c5287dc65dde03c268",
    measurementId: "G-WXWYTZK69P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
