import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  app = initializeApp(environment.firebase);
  auth = getAuth();
  googleProvider = new GoogleAuthProvider();

  isAuth(): boolean {
    return this.auth.currentUser ? true : false;
  }


  async getNickname(): Promise<string> {
    if (this.auth.currentUser) {
      const docRef = doc(getFirestore(this.app), "users", this.auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        console.log(docSnap.data()['firstName']);
        return docSnap.data()['firstName'];
      }
    }
    return "";
  }

  async isSeller(): Promise<boolean> {
    if (this.auth.currentUser) {
      const docRef = doc(getFirestore(this.app), "users", this.auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()['role'] == 1 ? true : false;
      } else {
        // doc.data() will be undefined in this case
        return false;
      }
    }
    console.log(this.auth.currentUser);
    return false;
  }

    // Inscription with email/password
    signUp(email: string, password: string) {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          //Create the user in the database
          const db = getFirestore(this.app);
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, {
            firstName: 'Gerard',
            lastName: 'Dupont',
            role: 0
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
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

    isAuthOwner(product: Product): boolean {
      if (this.auth.currentUser) {
        if (this.auth.currentUser.uid === product.owner) {
          return true;
        }
      }
      return false;
    }
  }
