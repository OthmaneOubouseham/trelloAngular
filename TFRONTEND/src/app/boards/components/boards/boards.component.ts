import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { BoardInterface } from 'src/app/shared/types/boards.interface';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
})
export class BoardsComponent implements OnInit {
  boards: BoardInterface[] = [];

  constructor(private boardsService: BoardsService) { }

  ngOnInit(): void {
    this.boardsService.getBoards().subscribe((boards: BoardInterface[]) => {
      this.boards = boards;
      console.log('Boards:', boards);
    });
  }

  createBoard(title: string): void {
    // Ajoute ici la logique pour créer un board si BoardsService possède cette méthode
    // Exemple :
    // this.boardsService.createBoard(title).subscribe((createdBoard: BoardInterface) => {
    //   this.boards = [...this.boards, createdBoard];
    // });
    console.log('Create board:', title);
  }
}
