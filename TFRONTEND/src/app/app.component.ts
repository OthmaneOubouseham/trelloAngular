import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('Current user:', user);
      },
      error: (error) => {
        console.log('Error fetching current user:', error);
        this.authService.setCurrentUser(null);
      }
  });
  }
  title = 'TFRONTEND';
}
