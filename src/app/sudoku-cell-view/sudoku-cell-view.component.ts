import { Component, Input, OnInit } from '@angular/core';
import { SudokuCell } from '../models/sudoku-cell';

@Component({
  selector: 'app-sudoku-cell-view',
  templateUrl: './sudoku-cell-view.component.html',
  styleUrls: ['./sudoku-cell-view.component.scss']
})
export class SudokuCellViewComponent implements OnInit {

  @Input() cell: SudokuCell|null = null;
  @Input() selectedCells: SudokuCell[] = [];
  public options: number[] = SudokuCell.OPTIONS;

  constructor() { }

  ngOnInit(): void {
  }

}
