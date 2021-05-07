import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuCellViewComponent } from './sudoku-cell-view.component';

describe('SudokuCellViewComponent', () => {
  let component: SudokuCellViewComponent;
  let fixture: ComponentFixture<SudokuCellViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudokuCellViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuCellViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
