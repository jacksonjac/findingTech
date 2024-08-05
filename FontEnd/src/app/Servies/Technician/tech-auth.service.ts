import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
interface Slot {
  id: string;
  date: string;
  time: string;
  techId: string;
  booked: boolean;
  createdAt: string;
  __v: number;
}
@Injectable({
  providedIn: 'root'
})
export class TechAuthService {

  constructor(private http:HttpClient,private router:Router) { }

  baseUrl = "http://localhost:3000/"

  registerTechnician(UserData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/technician/newTech`, UserData);
  }
  loginTechnician(userData: any): Observable<any> {
    console.log("loginTechnician api passing...")
    return this.http.post<any>(`${this.baseUrl}api/technician/newTechlogin`, userData);
  }
  GoogleregisterTechinician(UserData: any): Observable<any> {

       console.log("google request passing...")
    return this.http.post<any>(`${this.baseUrl}api/technician/GoogleRegister`, UserData);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('techtoken') 
  }
  VerifId(TechId:any){
    return this.http.put(`${this.baseUrl}api/technician/verify?id=${TechId}`, {});
  }
  getAllQuestions():Observable<any>{
    console.log("passing Questin List..")
    return this.http.get<any>(`${this.baseUrl}api/common/AllQuestions`)
  }
  Techlist():Observable<any>{
    console.log("passing Techlist..")
    return this.http.get<any>(`${this.baseUrl}api/admin/techlist`)
  }
  getChatsbyIds(userid: any, techid: any) {  
    console.log("passing .. chat fun")
  
    return this.http.get(`${this.baseUrl}api/common/getChatsbyId?userid=${userid}&techid=${techid}`);
  
  }
  getAllChatlistByid(TechId:any){
    console.log("passing getall chatlist fun",TechId)
return this.http.get(`${this.baseUrl}api/common/AllChatlistByTechid?id=${TechId}`,{});
}
getOneUserbyId(UserId:any){
  console.log("passing get userbyid fn ",UserId)
  return this.http.get(`${this.baseUrl}api/common/getOneUserbyId?id=${UserId}`,{});
}


  logoutUser(): void {
    localStorage.removeItem('techtoken');
      localStorage.removeItem('techid');
      localStorage.removeItem('techemail'); 
      localStorage.removeItem('TechData')
      localStorage.removeItem('techtoken')   

      
    this.router.navigate(['/technician/login']);
  }
  sendRoomIdToEmail(roomId: string, email: string): Observable<any> {
    const emailData = { roomId, email };
        console.log("sendToommto temil passsing...",roomId,email)
    return this.http.post<any>(`${this.baseUrl}api/common/sentRoomidToEmail`, emailData);
  }
  checkTechStatusByid(id:any){
    console.log("check pasing id ")
    return this.http.get(`${this.baseUrl}api/technician/GetTechDatabyId?id=${id}`, {});

  }
  getAllQuestionsbyId(DesiId:any):Observable<any>{
    console.log("passing QuestinbyId technician List..")
    return this.http.put(`${this.baseUrl}api/common/QDesi-id?id=${DesiId}`, {});
  }

  getDesignations():Observable<any>{
    console.log("passing get designation.")
    return this.http.get<any>(`${this.baseUrl}api/common/AllDesignation`)
  }

  AddNewSlot(slotdata:any){
    console.log("this is add slotdata passing",slotdata)
    return this.http.post<any>(`${this.baseUrl}api/technician/newSlot`,slotdata);

  }
  getSlots(techId:any){

    return this.http.get<any>(`${this.baseUrl}api/common/AllSlots?id=${techId}`, {})
     
    
    // return this.http.get<any>(`${this.baseUrl}api/common/`)
  }

  CanselSlot(slotid:any){
    return this.http.put<any>(`${this.baseUrl}api/technician/canselSlot?id=${slotid}`, {})

  }
  getOneTechbyId(techId:any){
    return this.http.get(`${this.baseUrl}api/common/getOneTechbyId?id=${techId}`,{});
  }
  uploadImage(fileName: any, techId: any) {
    const formData = new FormData();
    formData.append('image', fileName);
   
    return this.http.post<any>(`${this.baseUrl}api/technician/UploadImage?techId=${techId}`, fileName);
  }

  
}
