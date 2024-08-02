declare var google:any

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserInterface } from 'src/app/Interface/Users/user-interface';

import { ToastService } from 'src/app/Servies/Toster/toast-service.service';
import { RegisterResponse } from 'src/app/Interface/Users/RegisterResponse';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';


@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.scss'],
  providers: [MessageService]
})
export class ClientSignupComponent implements OnInit{

  constructor(private fb: FormBuilder ,
    private auth:UserAuthService,
    private toastService: ToastService,
    private router:Router,
    private primengConfig: PrimeNGConfig) {}


    ngOnInit(): void {
      google.accounts.id.initialize({
        client_id: '1096596892716-ogub7mk17mvh4mus97tdcmkc87r82m2p.apps.googleusercontent.com',
        callback: (response: any) => this.handleLogin(response)
      });
  
      google.accounts.id.renderButton(document.getElementById("SignUp-btn"), {
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
        const payload = this.decodeToken(response.credential);
        if (payload) {
          const UserData: any = {
            name: payload.name,
            email: payload.email,
            phone: "", // If phone is not provided by Google, set it empty
            district: '', // If district is not provided by Google, set it empty
            password: payload.sub // Using Google user ID as a password placeholder
             };
  
          this.auth.GoogleregisterUser(UserData)
            .subscribe((response: any) => {
              console.log("google login response",response)
              if (response && response.status) {
  
                localStorage.setItem("token",response.token)
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
  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    district: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[^\\s]+$')]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: this.passwordMatchValidator });
  messageService: any;

  

  passwordMatchValidator(form: any) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    if (password !== confirmPassword) {
      form.get('confirmPassword').setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword').setErrors(null);
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const UserData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        phone: this.signupForm.value.phone,
        district: this.signupForm.value.district,
        password: this.signupForm.value.password
      };
  
      this.auth.registerUser(UserData as UserInterface).subscribe(
        (response: RegisterResponse) => {
          if (response) {
            console.log(response.OTP, "from back end");
            console.log(response.token,'token registe')
  
            // Store OTP in session storage
            sessionStorage.setItem('otp', response.OTP);
            localStorage.setItem("token",response.token)
  
            this.toastService.showSuccess('Data Added Successfully', '6 digit OTP sent to your Email');
            this.router.navigate(['otppage']);
          } else {
            console.log("Failed to register");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  


   
}
