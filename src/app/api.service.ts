import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SudokuJson, SudokuResponse } from './models/sudoku-api';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

    public getSudoku(): Observable<SudokuResponse> {
        return this.http.get<SudokuJson>(
            'https://sugoku.herokuapp.com/board?difficulty=easy', 
            {
              responseType: 'json',
              observe: 'body'
            }
        ).pipe(
            map(json => {
                return SudokuResponse.fromJson(json);
            })
        );
    }
}