import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe((user) => {
          if (user) {
              console.log('User is logged in:', user);
          }
          else {
              console.log('User is not logged in');
          }
          });
  }
}
