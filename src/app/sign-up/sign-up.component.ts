import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signup(this.signUpForm.value.email, this.signUpForm.value.password);
    }
  }
}
