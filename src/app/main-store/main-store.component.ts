import { Component } from '@angular/core';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrls: ['./main-store.component.css']
})
export class MainStoreComponent {
  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
