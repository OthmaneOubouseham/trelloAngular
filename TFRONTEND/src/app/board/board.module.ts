import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./components/board/board.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/services/authGuard.service";

const routes: Routes = [
    {
        path: 'board/:boardId',
        component: BoardComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [BoardComponent],
})

export class BoardModule {}