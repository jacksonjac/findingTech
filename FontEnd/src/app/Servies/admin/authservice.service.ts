import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient,private router:Router) { }
 baseUrl = "http://localhost:3000/"


  loginAdmin(AdminData: any): Observable<any> {
    console.log("loginadmin api passing..." ,AdminData)
    return this.http.post<any>(`${this.baseUrl}api/admin/Adminlogin`, AdminData);
  }

  Userlist():Observable<any>{
    console.log("passing uselist..")
    return this.http.get<any>(`${this.baseUrl}api/admin/userlist`)
  }

  Techlist():Observable<any>{
    console.log("passing Techlist..")
    return this.http.get<any>(`${this.baseUrl}api/admin/techlist`)
  }

  
  blockUser(userId: string): Observable<any> {
    console.log("Passing block user....", userId);
    return this.http.put(`${this.baseUrl}api/admin/blockuser?id=${userId}`, {});
  }
  UnblockUser(userId: string): Observable<any> {
    console.log("Passing block user....", userId);
    return this.http.put(`${this.baseUrl}api/admin/Unblockuser?id=${userId}`, {});
  }

  blockTech(userId: string): Observable<any> {
    console.log("Passing block Tech....", userId);
    return this.http.put(`${this.baseUrl}api/admin/blockTech?id=${userId}`, {});
  }
  ApproveTech(TechId: string): Observable<any> {
    console.log("Passing block Tech....", TechId);
    return this.http.put(`${this.baseUrl}api/admin/ApproveTech?id=${TechId}`, {});
  }
  DeniedTech(TechId: string): Observable<any> {
    console.log("Passing block Tech....", TechId);
    return this.http.put(`${this.baseUrl}api/admin/DeniedTech?id=${TechId}`, {});
  }
  deleteDesignation(id:any){
    console.log("Passing delete Designation Tech....", id);
    return this.http.put(`${this.baseUrl}api/admin/DeleteDesignation?id=${id}`, {});

  }
  UnblockTech(userId: string): Observable<any> {
    console.log("Passing unblock Tech....", userId);
    return this.http.put(`${this.baseUrl}api/admin/UnblockTech?id=${userId}`, {});
  }

  NewDesignation(designation: any): Observable<any> {
    console.log('Designation API request:', designation);
    return this.http.post<any>(`${this.baseUrl}api/admin/AddDesignation`, designation);
  }
  deleteQuestion(id:any){
    return this.http.put(`${this.baseUrl}api/admin/DeleteQuestion?id=${id}`, {});

  }
  
  NewQuestion(Question: any): Observable<any> {
    console.log('question API request:', Question);
    return this.http.post<any>(`${this.baseUrl}api/admin/NewQuestion`, Question);
  }
  UpdateQuestion(Questionid:any,Data:any): Observable<any> {
    console.log('question API request:', Questionid,Data);
    return this.http.put<any>(`${this.baseUrl}api/admin/UpdateQuestion?id=${Questionid}`, {Data});
  }
  getAllQuestions():Observable<any>{
    console.log("passing Questin List..")
    return this.http.get<any>(`${this.baseUrl}api/common/AllQuestions`)
  }
  getAllQuestionsbyId(DesiId:any):Observable<any>{
    console.log("passing QuestinbyId List..")
    return this.http.put(`${this.baseUrl}api/common/QDesi-id?id=${DesiId}`, {});
  }

  getOneTechbyId(techId:any){
    return this.http.get(`${this.baseUrl}api/common/getOneTechbyId?id=${techId}`,{});
  }
  getQuestionById(QuestionId:any){
    return this.http.get(`${this.baseUrl}api/admin/getOneQuestionbyId?id=${QuestionId}`, {});
  }
  getAllUserbyId(DesiId:any):Observable<any>{
    console.log("passing QuestinbyId List..")
    return this.http.put(`${this.baseUrl}api/common/UDesi-id?id=${DesiId}`, {});
  }
  getAllTechbyId(DesiId:any):Observable<any>{
    console.log("passing TechbyId List..")
    return this.http.put(`${this.baseUrl}api/common/TDesi-id?id=${DesiId}`, {});
  }
  getDesignations():Observable<any>{
    console.log("passing get designation.")
    return this.http.get<any>(`${this.baseUrl}api/common/AllDesignation`)
  }
  updateDesignation(DesiId:any,Data:any){
    return this.http.put<any>(`${this.baseUrl}api/admin/UpdateDesignation?id=${DesiId}`, {Data});
  }
  logoutUser(): void {
    localStorage.removeItem('admintoken');  
    this.router.navigate(['admin']);
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('admintoken') 
  }
}
