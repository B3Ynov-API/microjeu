import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService , private router: Router) {
    this.signUpForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      nickname: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(8)]]
    })
  }

  //user sign up and connected if the form is valid
  onSubmit() {
    if (this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
      console.log(this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password);
      this.router.navigate(['/mainStore']);
    }
  }

  //user connected with google
  googleButton() {
    this.authService.signInWithGoogle();
    this.router.navigate(['/mainStore']);
  }
}
