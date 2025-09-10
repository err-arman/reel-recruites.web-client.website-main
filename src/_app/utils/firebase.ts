import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNdtmgnE5FYjwmdBpQPy56j74f_bZeWRQ",
  authDomain: "reel-recruits.firebaseapp.com",
  projectId: "reel-recruits",
  storageBucket: "reel-recruits.appspot.com",
  messagingSenderId: "1091548912087",
  appId: "1:1091548912087:web:d317eee909f1e69ea8d392",
  measurementId: "G-P0YTW6RMLG",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
