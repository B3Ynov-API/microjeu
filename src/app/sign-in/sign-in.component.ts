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

<<<<<<< HEAD
  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/mainStore']);
      } else {
        console.log("L'utilisateur 'est pas connect");
      }
    });
  }

=======
>>>>>>> 714b6457e01d65194ce73c8bd6890dff1aa9cb10
  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password);
    }
  }

}
