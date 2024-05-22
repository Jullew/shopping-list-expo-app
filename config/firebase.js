import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import {FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID} from "@env"



const firebaseConfig = {
  apiKey: "AIzaSyBh5RyxSbwzbX4FSGqQt4sWkzFJtTFPY_0",
  authDomain: "lista-zakupow-7be82.firebaseapp.com",
  projectId: "lista-zakupow-7be82",
  storageBucket: "lista-zakupow-7be82.appspot.com",
  messagingSenderId: "559391782854",
  appId: "1:559391782854:web:d026c2e96843b23d9664c7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('Persistence failed');
    } else if (err.code === 'unimplemented') {
      console.log('Persistence is not available');
    }
  });

  const auth = getAuth(app);

export { db, auth };
