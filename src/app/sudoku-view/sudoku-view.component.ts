import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { SudokuBoard } from '../models/sudoku-board';
import { SudokuCell } from '../models/sudoku-cell';

@Component({
  selector: 'app-sudoku-view',
  templateUrl: './sudoku-view.component.html',
  styleUrls: ['./sudoku-view.component.scss']
})
export class SudokuViewComponent implements OnInit, AfterViewInit {

  public board: SudokuBoard = new SudokuBoard;
  @ViewChild('boardElement') boardElement!: ElementRef<HTMLElement>; 
  @ViewChild('boardContainer') boardContainer!: ElementRef<HTMLElement>; 
  @HostListener('window:resize', ['$event']) resizeListener() {this.resize()};
  @HostListener('window:keyup', ['$event']) keyUpListener(event: KeyboardEvent) {
    this.keyUp(event)
  };

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getSudoku().subscribe(r => {
      this.board.initialize(r);
    });
  }

  ngAfterViewInit(): void {
    this.resize();
  }

  private resize(): void {
    const size = this.boardContainer.nativeElement.offsetHeight < this.boardContainer.nativeElement.offsetWidth
      ? this.boardContainer.nativeElement.offsetHeight
      : this.boardContainer.nativeElement.offsetWidth;
      this.boardElement.nativeElement.style.width = size+"px";
      this.boardElement.nativeElement.style.height = size+"px";
      this.boardElement.nativeElement.style.fontSize = size+"px";
  }

  private keyUp(event: KeyboardEvent): void {
    if (
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key) 
      && this.board.selectedCells.length === 1
    ) {
      const selectedCell = this.board.selectedCells.find(x => x !== undefined);
      if (selectedCell !== undefined) {
        this.board.fillValue(selectedCell, parseInt(event.key));
      }
    } else if(
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
      && this.board.selectedCells.length > 0
    ) {
      const [lastSelected] = this.board.selectedCells.slice(-1);
      let row = lastSelected.row;
      let column = lastSelected.column;
      switch(event.key) {
        case 'ArrowLeft':
          column--;
          break;
        case 'ArrowRight':
          column++;
          break;
        case 'ArrowUp':
          row--;
          break;
        case 'ArrowDown':
          row++;
          break;
      }
      const newCell = this.board.getCell(column, row);
      if(newCell !== null) {
        this.board.selectCell(newCell, event.shiftKey);
      }
    } else if (event.key === 'Escape') {
      this.board.selectCell(null);
    }
  }

  public onDragEnter(cell: SudokuCell) {
    this.board.selectCell(cell, true);
  }

  public onDragStart(e: DragEvent, cell: SudokuCell) {
    const el = document.createElement("div");
    e.dataTransfer?.setDragImage(el, 0, 0);
    this.board.selectCell(cell);
  }

}
