import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/Interface/Users/user-interface';
import { LoginResponse } from 'src/app/Interface/LoginUser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/Interface/Users/RegisterResponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http:HttpClient,private router:Router) { }


  baseUrl = "http://localhost:3000/"

  registerUser(UserData: any): Observable<RegisterResponse> {
    return this.http.post<any>(`${this.baseUrl}api/user/newUser`, UserData);
  }
  loginUser(userData: UserInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}api/user/newLogin`, userData);
  }
  GoogleregisterUser(UserData: any): Observable<any> {

      
    return this.http.post<any>(`${this.baseUrl}api/user/GoogleRegister`, UserData);
  }

  VerifId(UserId:any){
    return this.http.get(`${this.baseUrl}api/user/verify?id=${UserId}`, {});


  }
  getAllTechbyId(DesiId:any):Observable<any>{
  
    return this.http.put(`${this.baseUrl}api/common/TDesi-id?id=${DesiId}`, {});
  }
  getDesignations():Observable<any>{
    console.log("passing get designation.")
    return this.http.get<any>(`${this.baseUrl}api/common/AllDesignation`)
  }

  getlocation():Observable<any>{
    return this.http.get<any>("https://ipinfo.io/json?token=a912bb9bdf0c18")
  }
  Techlist():Observable<any>{
    console.log("passing Techlist..")
    return this.http.get<any>(`${this.baseUrl}api/admin/techlist`)
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('token') 
  }
  getSlots(techId:any){
    return this.http.get(`${this.baseUrl}api/common/AllSlots?id=${techId}`, {});
    // return this.http.get<any>(`${this.baseUrl}api/common/`)
  }
  getOneTechbyId(techId:any){
    return this.http.get(`${this.baseUrl}api/common/getOneTechbyId?id=${techId}`,{});
  }
  UserAddNewSlot(slotData:any){
    return  this.http.post<any>(`${this.baseUrl}api/user/addNewSlot`,slotData);
  }
  addAddress_slotbook(Data:any){

    console.log("get appoinment data address and slot and booking passing..", Data);
    return  this.http.post<any>(`${this.baseUrl}api/user/Add_newAdrres`,Data);

  }
  getAppoimentDataById(slotId: any) {
     console.log("passing chats gets api ..")
    return this.http.get(`${this.baseUrl}api/user/AppoinmentById?Id=${slotId}`, {});
}
getChatsbyIds(userid: any, techid: any) {  
  console.log("passing .. chat fun")

  return this.http.get(`${this.baseUrl}api/common/getChatsbyId?userid=${userid}&techid=${techid}`);

}


getAllbookingsbyId(userId:any){
  return this.http.get(`${this.baseUrl}api/user/BookingsById?Id=${userId}`, {});
}

getAllChatlistByid(UserId:any){
         console.log("passing getall chatlist fun",UserId)
  return this.http.get(`${this.baseUrl}api/common/AllChatlistByid?id=${UserId}`,{});
}

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('Userid');
    localStorage.removeItem('email');
   
    localStorage.removeItem('tech-data')
    localStorage.removeItem('slot-data')
    localStorage.removeItem('email')
    

    
    this.router.navigate(['']);
  }
  
  uploadImage(fileName:any,techid:any){
    const formData = new FormData();
    formData.append('image', fileName);
    return this.http.post<any>(`${this.baseUrl}api/user/Upload?techId=${techid}`, fileName);
  }


 
}
