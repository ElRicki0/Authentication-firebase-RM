// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx4ivMDFgx2MdQNUWhIZXpvn7mJE8VqGQ",
    authDomain: "practica-firebase-20220685.firebaseapp.com",
    projectId: "practica-firebase-20220685",
    storageBucket: "practica-firebase-20220685.appspot.com",
    messagingSenderId: "491238602732",
    appId: "1:491238602732:web:1135347716f48bc7b232c9"
};


console.log("Valor de configuracion", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
    console.log('Firebase initialized successfully');
} else {
    console.log('Firebase initialization failed');
}

const database = getFirestore(app);
if (database) {
    console.log('Firestore initialized correctly');
} else {
    console.log('Firestore initialization failed');
}

const storage = getStorage(app);

if (storage) {
    console.log('storage initialized correctly');
} else {
    console.log('storage initialization failed');
}

export { database, storage, app};