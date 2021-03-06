import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';

export default class AuthService {
  constructor() {
    this.firebase = firebase
      .initializeApp({
        apiKey: "AIzaSyBbI_s6AoyogF-uHZBbqK73fHic4iwh8mY",
        authDomain: "not-gamp-machine.firebaseapp.com",
        databaseURL: "https://not-gamp-machine.firebaseio.com",
        projectId: "not-gamp-machine",
        storageBucket: "not-gamp-machine.appspot.com",
        messagingSenderId: "1087063166754",
        appId: "1:1087063166754:web:bcc4d059d4db82fc"
      })
      .auth();
  }

  login({ email, password }) {
    return this.firebase.signInWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.firebase.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.firebase.signOut();
  }
  
  
}