import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  form = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    
  });
  onSubmit(): void {
    console.log('Form submitted:', this.form.value);
    this.authService.register({
      email: this.form.value.email!,
      username: this.form.value.username!,
      password: this.form.value.password!
    }).subscribe({
      next: (currentUser) => {
        console.log('User registered successfully:', currentUser);
        this.authService.setCurrentUser(currentUser);
        this.authService.setToken(currentUser);
      },
      error: (error) => {
        console.log('Error registering user:', error);
      }
    });
    


  }
  

}
