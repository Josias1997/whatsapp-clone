import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDAdkY-PCGuhtCqt0OKs9rBgmvMpc0_WMo",
    authDomain: "react-whatsapp-clone-57743.firebaseapp.com",
    databaseURL: "https://react-whatsapp-clone-57743.firebaseio.com",
    projectId: "react-whatsapp-clone-57743",
    storageBucket: "react-whatsapp-clone-57743.appspot.com",
    messagingSenderId: "145102399787",
    appId: "1:145102399787:web:4ef48918d29c6a53acfd6e",
    measurementId: "G-VP232Z4L6P"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };