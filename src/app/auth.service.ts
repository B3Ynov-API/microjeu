import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  app = initializeApp(environment.firebase);
  auth = getAuth();

  isAuth(): boolean {
    return this.auth.currentUser ? true : false;
  }

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

  disconnect() {
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  isAuthOwner(product: Product): boolean {
    if (this.auth.currentUser) {
      if (this.auth.currentUser.uid === product.owner)
      {
        return true;
      }
    }
    return false;
  }
}
