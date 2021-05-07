import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SudokuViewComponent } from './sudoku-view/sudoku-view.component';
import { SudokuCellViewComponent } from './sudoku-cell-view/sudoku-cell-view.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    SudokuViewComponent,
    SudokuCellViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
