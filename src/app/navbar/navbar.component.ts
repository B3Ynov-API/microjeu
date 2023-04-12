import { AuthService } from './../auth.service';
import { getAuth } from 'firebase/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(private authService : AuthService) { }

  username=this.authService.getNickname();
  showMenu = false;
  auth=getAuth();
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
