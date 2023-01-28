import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCfoDpBcBbYkgg_vc_-zU4v6o9fhfvWsA",
  authDomain: "candle-af-shop.firebaseapp.com",
  projectId: "candle-af-shop",
  storageBucket: "candle-af-shop.appspot.com",
  messagingSenderId: "968957062816",
  appId: "1:968957062816:web:422aaed12eacb8628663c5",
  measurementId: "G-HJM1TRMWJS"
};


export const app = initializeApp(firebaseConfig);
export const AuthThing = new GoogleAuthProvider(app)
export const AuthSecond = new FacebookAuthProvider(app)
export const db = getFirestore(app)