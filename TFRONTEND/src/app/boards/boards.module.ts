import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardsComponent } from "./components/boards/boards.component";


const routes: Routes = [
    {
        path: 'boards',
        component: BoardsComponent,
        // canActivate: [AuthGuard], // décommente si AuthGuard existe
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        BoardsComponent,
    ],
    // providers: [BoardsService], // décommente si BoardsService existe
})
export class BoardsModule { }