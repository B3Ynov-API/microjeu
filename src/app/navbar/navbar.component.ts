import { AuthService } from './../auth.service';
import { getAuth } from 'firebase/auth';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(private authService : AuthService) { }

  username: string="";
  showMenu : boolean = false;
  auth : Auth=getAuth();

  ngOnInit(){

    this.authService.getNickname().then((name) => {
      this.username=name;
    });
  }

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
