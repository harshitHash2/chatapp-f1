// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCaVfsLvrlia2jEGNPSD2V7DAPqvvzZ9kI",
    authDomain: "chat-app-fe05e.firebaseapp.com",
    databaseURL: "https://chat-app-fe05e-default-rtdb.firebaseio.com",
    projectId: "chat-app-fe05e",
    storageBucket: "chat-app-fe05e.appspot.com",
    messagingSenderId: "781678478298",
    appId: "1:781678478298:web:b9b4b4287501fe5f07f6e3",
    measurementId: "G-NG0NEPS9Z8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
