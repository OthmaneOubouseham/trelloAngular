import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
        }
];
@NgModule({
    providers: [AuthService],
    declarations: [
      RegisterComponent
    ],
    imports: [RouterModule.forChild(routes)]
})
export class AuthModule {}