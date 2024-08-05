import { Component, OnInit } from '@angular/core';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';

@Component({
  selector: 'app-tech-notifications',
  templateUrl: './tech-notifications.component.html',
  styleUrls: ['./tech-notifications.component.scss']
})
export class TechNotificationsComponent implements OnInit{
  Notifications: any[] = [];

  constructor(private authService: TechAuthService) {}

  ngOnInit(): void {
    const techid = localStorage.getItem('techid');
    if (techid) {
      this.getAllNotificationsById(techid);
    }
  }

  getAllNotificationsById(id: string): void {
    this.authService.getNotificationsByTechId(id).subscribe(
      (response: any) => {
        console.log("Response of get all notifications:", response);
        if (response.status) {
          this.Notifications = response.data;
        } else {
          console.error('Failed to fetch notifications:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  removeNotification(notification: any): void {
    const index = this.Notifications.indexOf(notification);
    if (index > -1) {
      this.Notifications.splice(index, 1);
    }
  }
}
