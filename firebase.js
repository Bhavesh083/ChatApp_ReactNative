import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCybC5uNJHxLxLEg8YHRRAyOivIZ2LfW1U",
    authDomain: "chat-app-reactnative-d27a0.firebaseapp.com",
    projectId: "chat-app-reactnative-d27a0",
    storageBucket: "chat-app-reactnative-d27a0.appspot.com",
    messagingSenderId: "866100037841",
    appId: "1:866100037841:web:780d5568532054150bddf0"
  };

  let app;

  if(firebase.apps.length === 0){    
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db,auth};