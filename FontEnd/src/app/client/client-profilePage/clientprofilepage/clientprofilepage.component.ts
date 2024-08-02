import { Component } from '@angular/core';
import { CloudinaryUplodService } from 'src/app/Servies/Users/cloudinary-uplod.service';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';

@Component({
  selector: 'app-clientprofilepage',
  templateUrl: './clientprofilepage.component.html',
  styleUrls: ['./clientprofilepage.component.scss']
})
export class ClientprofilepageComponent {

  selectedFile: File | null = null;

  constructor(private auth: UserAuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      const Userid = localStorage.getItem('Userid')

      this.auth.uploadImage(formData,Userid).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
        },
        (error: any) => {
          console.error('Image upload failed:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}
