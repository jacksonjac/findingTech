import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';
import { DateBookComponent } from '../../modal/dateBook/date-book/date-book.component';

@Component({
  selector: 'app-client-tech-profile',
  templateUrl: './client-tech-profile.component.html',
  styleUrls: ['./client-tech-profile.component.scss']
})
export class ClientTechProfileComponent implements OnInit {

  technician: any;

  constructor(
    private route: ActivatedRoute, private auth:UserAuthService,
    private modal: MatDialog,private cdr: ChangeDetectorRef,private router:Router
  
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
     if(id){

       this.fetchTechnicianDetails(id)
     }else{
      console.log("id not found")
     }
  }

  chatpage(id: any): void {
    console.log(id, "this is the technician id");
    this.router.navigate(['/chatpage', id]); // Navigate to the chat page with the technician's ID
  }

  fetchTechnicianDetails(id: string): void {
    this.auth.getOneTechbyId(id).subscribe((data:any) => {

      console.log("techdetails page data",data)
      if(data.status){

        this.technician = data.data.data;
      }
    });
  }
showAppoimentmodal(id:any){
  localStorage.setItem('Temb-tech_id',id)

 const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  const dialogRef = this.modal.open(DateBookComponent, dialogConfig);

  

}


}
