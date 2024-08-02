import { Component } from '@angular/core';
import { TechAuthService } from '../Servies/Technician/tech-auth.service';
 import { fadeAnimation } from '../Servies/animations/animation.service';
@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.scss']
})
export class TechnicianComponent {
  dropdownOpen = false;
  userName = 'Bonnie Green';
  userEmail = 'name@flowbite.com';
  constructor(private authService:TechAuthService){}
ngOnInit(): void {
     console.log("slkfjsdlfksjdfkdsjffd")
}

 

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout(): void {
    this.authService.logoutUser();
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
