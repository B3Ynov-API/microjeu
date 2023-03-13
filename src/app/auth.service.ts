import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  app = initializeApp(environment.firebase);
  auth = getAuth();
  googleProvider = new GoogleAuthProvider();


  // Inscription with email/password
  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  // Connexion with email/password
  signIn(email: string, password: string) {
    console.log('sign in')
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Successfully signed in!');
        const user = userCredential.user;
        console.log(user);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  // signInWithGoogle() {
  //   signInWithRedirect(this.auth, this.googleProvider)
  // }

  // On privilégie le popup afin de se faciliter la vie, cependant le redirect est un meilleur choix pour l'UX
  signInWithGoogle() {
    signInWithPopup(this.auth, this.googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  disconnect() {
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
}
