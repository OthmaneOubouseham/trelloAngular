import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/shared/services/boards.service';
 // décommente si BoardInterface existe


@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
})
export class BoardsComponent implements OnInit {
    constructor( private boardsService: BoardsService ) { }

    ngOnInit(): void {
        this.boardsService.getBoards().subscribe((boards) => {
            console.log('Boards:', boards);
        });
    }

}
