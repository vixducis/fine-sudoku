import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SudokuViewComponent } from './sudoku-view/sudoku-view.component';

const routes: Routes = [
  {
    path: 'sudoku',
    component: SudokuViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
