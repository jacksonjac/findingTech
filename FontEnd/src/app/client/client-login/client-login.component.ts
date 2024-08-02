declare var google: any;
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/Interface/Users/user-interface';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';
import { RegisterResponse } from 'src/app/Interface/Users/RegisterResponse';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {
   LoggedUser:string = ""
   LoggedEmail:string = ""
   isLoading:boolean = false
   
  constructor(
    private fb: FormBuilder,
    private auth: UserAuthService,
    private toastService: ToastService,
    private router: Router,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {

    
    this.spinner.show
    this.isLoading = true

    setTimeout(() => {
     
      this.spinner.hide();
      this.isLoading = false
    }, 2000)
    google.accounts.id.initialize({
      client_id: '1096596892716-ogub7mk17mvh4mus97tdcmkc87r82m2p.apps.googleusercontent.com',
      callback: (response: any) => this.ngZone.run(() => this.handleLogin(response))
    });

    google.accounts.id.renderButton(document.getElementById("login-btn"), {
      theme: 'filled_black',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular'
    });
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  handleLogin(response: any): void {
    if (response) {
      console.log(response,"responce form google")
      const payload = this.decodeToken(response.credential);
      if (payload) {
        const UserData: any = {
          name: payload.name,
          email: payload.email,
          phone: "", // If phone is not provided by Google, set it empty
          district: '', // If district is not provided by Google, set it empty
          password: "1234" // Using Google user ID as a password placeholder
           };
           console.log(UserData,"datafrom font end")
        this.auth.GoogleregisterUser(UserData)
          .subscribe((response: any) => {
            console.log("google login respons login page",response)
            if (response && response.status) {

              localStorage.setItem("token",response.token)
              localStorage.setItem('Userid', response.data._id);
              localStorage.setItem('email', response.data.email);
              localStorage.setItem('imageUrl',response.image)
              this.toastService.showSuccess('Registration Successful', 'Welcome to the Technicians List!');
              this.router.navigate(['techlist']);
            } else {
              this.toastService.showError('Registration Failed', response.message || 'Unable to register your account.');
            }
          }, error => {
            console.log("Error during registration:", error);
            this.toastService.showError('Error', 'An error occurred during registration.');
          });
      } else {
        this.toastService.showError('Registration Failed', 'Invalid registration response.');
      }
    }
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[^\\s]+$')]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const UserData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.auth.loginUser(UserData as UserInterface)
        .subscribe((response: any) => {
          if (response && response.status) {
            this.LoggedUser = response.data.name
            this.LoggedEmail = response.data.email
           //setdata basic data to local storage 
            localStorage.setItem('token', response.token);
            localStorage.setItem('Userid', response.data._id);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('UserName', response.data.name);


            this.toastService.showSuccess('Login Successful', `Welcome to FindTech ${response.data.name}`);
            this.router.navigate(['techlist']);
          } else {
            this.toastService.showError('Login Failed', response.message || 'Please check your credentials.');
          }
        }, error => {
          console.log("Error during login:", error);
          this.toastService.showError('Error', 'An error occurred during login.');
        });
    }
  }
}
