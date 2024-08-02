declare var google:any
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';

@Component({
  selector: 'app-technician-signup',
  templateUrl: './technician-signup.component.html',
  styleUrls: ['./technician-signup.component.scss']
})
export class TechnicianSignupComponent {


  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    district: ['', [Validators.required]],
    workexp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    worklevel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    Designation: ['', [Validators.required]],
    AadarNo: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]], // Aadhar number should be 12 digits
    PanNo: ['', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')]], // PAN number format
    serviceCharge: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[^\\s]+$')]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: this.passwordMatchValidator });
  

  constructor(private fb: FormBuilder, private techAuthService: TechAuthService, private router: Router) {}

 
  

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
      console.log('Form Submitted!', this.signupForm.value);
      this.techAuthService.registerTechnician(this.signupForm.value).subscribe(
        response => {

     
          console.log('Registration successful', response);
          console.log(response.OTP, "from back end");
          console.log(response.token,'token registe')

          sessionStorage.setItem('techotp', response.OTP);
            localStorage.setItem("techtoken",response.token)
          this.router.navigate(['/technician/otp-page']); // Navigate to the login page or any other page
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}
