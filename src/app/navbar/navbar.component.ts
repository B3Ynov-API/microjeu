import { AuthService } from './../auth.service';
import { getAuth } from 'firebase/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(private authService: AuthService) { }

  username: string = "";
  showMenu = false;
  auth = getAuth();
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  ngOnInit(){
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authService.getNickname().then((nickname) => {this.username = nickname});
      }
    })
  }
}
