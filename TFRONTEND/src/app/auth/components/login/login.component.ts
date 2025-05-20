import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    
  });
  onSubmit(): void {
    console.log('Form submitted:', this.form.value);
    this.authService.login({
      email: this.form.value.email!,
      password: this.form.value.password!
    }).subscribe({
      next: (currentUser) => {
        console.log('User logined successfully:', currentUser);
        this.authService.setCurrentUser(currentUser);
        this.authService.setToken(currentUser);
        this.router.navigateByUrl('/');

      },
      error: (error) => {
        console.log('Error logining user:', error);
      }
    });
    


  }
  

}
