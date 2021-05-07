import { SudokuResponse } from "./sudoku-api";
import { SudokuCell } from "./sudoku-cell";

export class SudokuBoard {
    public cells: Array<SudokuCell> = [];
    public selectedCell: SudokuCell|null = null;
    public selectedCells: SudokuCell[] = [];
    
    public initialize(board: SudokuResponse) {
        for (let row=0; row<9; row++) {
            for (let column=0; column<9; column++) {
              const cell = new SudokuCell(column, row);
              cell.prefill = board.getValue(column, row);
              this.cells.push(cell);
            }
        }
        this.prefillNotes();
    }

    public prefillNotes(): void {
        for (let cell of this.cells) {
            const values = this.getRowValues(cell.row).concat(
                this.getColumnValues(cell.column),
                this.getHouseValues(cell.house)
            );
            const toTest = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            toTest.forEach(test => {
                if (!values.includes(test)) {
                    cell.toggleNotation(test, SudokuCell.NOTED);
                }
            });
        }
    }

    public fillValue(cell: SudokuCell, number: number): void {
        cell.fill = number;
        this.cells.forEach(checkCell => {
            if(
                (
                    checkCell.row === cell.row 
                    || checkCell.column === cell.column 
                    || checkCell.house === cell.house
                ) && checkCell.hasNotation(number)
            ) {
                checkCell.toggleNotation(number, SudokuCell.EMPTY);
            }
        });
    }

    public getRowValues(row: number): number[] {
        const values: number[] = [];
        for (let cell of this.cells) {
            if (cell.row === row) {
                const value = cell.value;
                if (value !== null) {
                    values.push(value);
                }
            }
        }
        return values;
    }

    public getColumnValues(column: number): number[] {
        const values: number[] = [];
        for (let cell of this.cells) {
            if (cell.column === column) {
                const value = cell.value;
                if (value !== null) {
                    values.push(value);
                }
            }
        }
        return values;
    }

    public getHouseValues(house: number): number[] {
        const values: number[] = [];
        for (let cell of this.cells) {
            if (cell.house === house) {
                const value = cell.value;
                if (value !== null) {
                    values.push(value);
                }
            }
        }
        return values;
    }

    /**
     * Selects a cell. You can select only 1 or multiple cells.
     * This can be specified with the multi parameter. 
     * Pass the cell you want to select or null if you want to clear the selection.
     * @param cell 
     * @param multi 
     */
    public selectCell(cell: SudokuCell|null, multi: boolean = false): void {
        this.selectedCell = cell;
        if (cell === null) {
            this.selectedCells = [];
        } else if (multi) {
            if (this.selectedCells.find(c => {
                return c.row === cell.row && c.column === cell.column
            }) === undefined) {
                this.selectedCells.push(cell);
            }
        } else {
            this.selectedCells = [cell];
        }
    }

    /**
     * Returns the cell at the given column and row.
     * If the values were invalid, null will be returned.
     * @param column 
     * @param row 
     * @returns 
     */
    public getCell(column: number, row: number): SudokuCell|null {
        const cell = this.cells.find(c => {
            return c.row === row && c.column === column;
        });
        return cell === undefined ? null : cell;
    }
}