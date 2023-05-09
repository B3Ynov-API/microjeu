import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AngularFireAuth]
})
export class SignInComponent {

  signInForm: FormGroup;
  auth = getAuth();

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
    this.signInForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  //Retrive data when the component is initialized
  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/mainStore']);
      } else {
        console.log("L'utilisateur n'est pas connecté");
      }
    });
  }
  //user connected if the form is valid
  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password);
    }
    else (console.log("form non valide"));
  }

  //user connected with google
  googleButton() {
    this.authService.signInWithGoogle();

  }
}
