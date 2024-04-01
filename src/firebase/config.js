import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSnMZ1SBLoPoJw8IsDHegzpdlIYqcyz1o",
    authDomain: "placesmedellin-97edc.firebaseapp.com",
    projectId: "placesmedellin-97edc",
    storageBucket: "placesmedellin-97edc.appspot.com",
    messagingSenderId: "824647944362",
    appId: "1:824647944362:web:f29225a8499c4cfec628d3",
    measurementId: "G-S19ENESL9H"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Init Services
const projectFirestore = firebase.firestore();

// This is for Analytics 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { projectFirestore }
