import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSkrRVyZfR4tpPUIZph4rFk8SETPeia7g",
  authDomain: "movieapp-c3333.firebaseapp.com",
  projectId: "movieapp-c3333",
  storageBucket: "movieapp-c3333.appspot.com",
  messagingSenderId: "317393928783",
  appId: "1:317393928783:web:79826561650f5e64a6203a",
  measurementId: "G-28PMRL88NS",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDb = getFirestore(FirebaseApp);
