// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCjQ0-fWdSCSu441h32Qv2AvUEW_fLda1U',
    authDomain: 'montecasinobar-d9ed7.firebaseapp.com',
    databaseURL: 'https://montecasinobar-d9ed7-default-rtdb.firebaseio.com',
    projectId: 'montecasinobar-d9ed7',
    storageBucket: 'montecasinobar-d9ed7.appspot.com',
    messagingSenderId: '558106160020',
    appId: '1:558106160020:web:7e565eb5ee2d740b2d7d81',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default { db, auth, storage };
