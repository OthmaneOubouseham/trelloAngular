import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from "@angular/router";
import { loginComponent } from "./components/login/login.component";


const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
        },
    {
        path: 'login',
        component: loginComponent
        },
        
];
@NgModule({
    providers: [AuthService],
    declarations: [
      RegisterComponent,
      loginComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      CommonModule
    ]
})
export class AuthModule {}