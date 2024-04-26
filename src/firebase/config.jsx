import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDOtlnLR0asU22g4U9idhDnelIUq52zEAE",
    authDomain: "miniblog-ee8df.firebaseapp.com",
    projectId: "miniblog-ee8df",
    storageBucket: "miniblog-ee8df.appspot.com",
    messagingSenderId: "123801519972",
    appId: "1:123801519972:web:7ddd68c3faf9e4f7141c71"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }