import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC6HBF3u07GXvGyQayRkvWti6h5fUdd2rU",
    authDomain: "messenger-clone-d14e5.firebaseapp.com",
    databaseURL: "https://messenger-clone-d14e5.firebaseio.com",
    projectId: "messenger-clone-d14e5",
    storageBucket: "messenger-clone-d14e5.appspot.com",
    messagingSenderId: "414945475006",
    appId: "1:414945475006:web:88e43582aa06ef072221ef"
})

const db = firebaseApp.firestore()

export default db