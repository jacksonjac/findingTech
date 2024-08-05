import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';
import { DateBookComponent } from '../../modal/dateBook/date-book/date-book.component';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-client-tech-profile',
  templateUrl: './client-tech-profile.component.html',
  styleUrls: ['./client-tech-profile.component.scss']
})
export class ClientTechProfileComponent implements OnInit {
  value: number | undefined
   avgvalue=0
  technician: any;
  comments: any[] = [];
  isFormValid = false;
  userId = ""
  Rcount =0
  constructor(
    private route: ActivatedRoute, private auth:UserAuthService,
    private modal: MatDialog,private cdr: ChangeDetectorRef,
    private router:Router,private toaster:ToastService
  
  ) {}

  newComment: any = {
    content: '',
    ratingValue: 0
  };

  validateForm() {
    this.isFormValid = this.newComment.content.trim() !== '' && this.newComment.ratingValue > 0;
  }
  ngOnInit(): void {

   const userid = localStorage.getItem('Userid')
   if(userid){
    this.userId = userid
   }
    const id = this.route.snapshot.paramMap.get('id');
     if(id){

       this.fetchTechnicianDetails(id)
     }else{
      console.log("id not found")
     }

     this.getComments(id)
  }

  chatpage(id: any): void {
    console.log(id, "this is the technician id");
    this.router.navigate(['/chatpage', id]); // Navigate to the chat page with the technician's ID
  }
  addComment(techid: any) {
    const commentData = {
      technicianId: techid,
      commenterId: this.userId,
      date: new Date(),
      content: this.newComment.content,
      ratingValue: this.newComment.ratingValue
    };
  
    this.auth.addComment(commentData).subscribe(
      response => {
        console.log("Response of add comment function:", response);
        this.toaster.showSuccess("Comment Added Successfully", "");
  
        // Clear the comment and rating fields
        this.newComment = { content: '', ratingValue: 0 };
        this.isFormValid = false; // Optional: Disable the button after resetting the form
  
        // Fetch updated comments
        this.getComments(techid);
      },
      error => {
        console.error("Error adding comment:", error);
      }
    );
  }
  getComments(techid: any) {
    this.auth.getCommentsByTechid(techid).subscribe((response:any) => {
      if (response.status) {
        console.log("the reponse of the getcomments fuction",response)
        this.comments = response.data;
        this.avgvalue = response.averageRating
        this.Rcount = response.commentCount
        // Update the comments array with fetched data
      } else {
        console.error("Failed to fetch comments:", response.message);
      }
    }, error => {
      console.error("Error fetching comments:", error);
    });
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
