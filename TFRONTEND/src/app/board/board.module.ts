import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./components/board/board.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/services/authGuard.service";
import { BoardService } from "./services/board.service";
import { ColumnsService } from "../shared/services/columns.service";
// Update the path below to the correct relative location of topbar.module.ts
import { TopbarModule } from "../shared/modules/topbar/topbar.module";
import { InlineFormModule } from "../shared/modules/inlineForm/inlineForm.module"; // adapte le chemin si besoin

const routes: Routes = [
    {
        path: 'board/:boardId',
        component: BoardComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TopbarModule,
        InlineFormModule 
    ],
    declarations: [BoardComponent],
    providers: [BoardService, ColumnsService],
})

export class BoardModule {}