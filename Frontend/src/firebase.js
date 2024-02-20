import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "react-redux-8a03c.firebaseapp.com",
    projectId: "react-redux-8a03c",
    storageBucket: "react-redux-8a03c.appspot.com",
    messagingSenderId: "376482525006",
    appId: "1:376482525006:web:eae087cce7994e8a2bf81f",
    measurementId: "G-3ZBQ8P16PC"
};

export const app =initializeApp(firebaseConfig);  