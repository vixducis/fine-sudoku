export class SudokuCell {
    static readonly EMPTY = 0;
    static readonly ACCENTED = 1;
    static readonly NOTED = 2;
    static readonly CROSSED = 3;
    static readonly OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    private filled: number|null = null;
    private prefilled: number|null = null;
    public highlighted: boolean = false;

    constructor(
        // column should be between 0 and 8
        public column: number,
        // column should be between 0 and 8
        public row: number,
    ) {}

    private options = [
        {number: 1, note: SudokuCell.EMPTY},
        {number: 2, note: SudokuCell.EMPTY},
        {number: 3, note: SudokuCell.EMPTY},
        {number: 4, note: SudokuCell.EMPTY},
        {number: 5, note: SudokuCell.EMPTY},
        {number: 6, note: SudokuCell.EMPTY},
        {number: 7, note: SudokuCell.EMPTY},
        {number: 8, note: SudokuCell.EMPTY},
        {number: 9, note: SudokuCell.EMPTY}
    ];

    /**
     * Returns the house the cell is in. 
     * This will be a number between 0 and 8.
     * The number indicates the house from left to right, from top to bottom.
     * @returns
     */
    get house(): number {
        return Math.floor(this.row/3)*3 + Math.floor(this.column/3);
    }

    set fill(n: number|null) {
        if (n === null || (n >= 1 && n <= 9)) {
            this.filled = n;
        }
    }

    get fill(): number|null {
        return this.filled;
    }

    set prefill(n: number|null) {
        if (n === null || (n >= 1 && n <= 9)) {
            this.prefilled = n;
        }
    }

    get prefill(): number|null {
        return this.prefilled;
    }

    get value(): number|null {
        return this.prefill === null ? this.fill : this.prefill;
    }

    /**
     * Returns the stored note for the given number.
     * @param number 
     * @returns 
     */
    public getNotation(number: number): number {
        const el = this.options.find(numberElement => {
            return number === numberElement.number;
        });
        return el === undefined ? SudokuCell.EMPTY : el.note;
    }

    /**
     * Returns whether the cell has a notation with the given number.
     * @param number 
     */
    public hasNotation(number: number|null): boolean {
        return number === null
            ? false
            : [SudokuCell.ACCENTED, SudokuCell.NOTED].includes(this.getNotation(number));
    }

    /**
     * Checks whether a cell is unmatched with the selection of cells
     * @param selectedCells 
     * @returns 
     */
    public isUnmatched(selectedCells: SudokuCell[]): boolean {
        if (selectedCells.length === 1) {
            const selectedCell = selectedCells.find(x => x !== undefined);
            if(selectedCell !== undefined && selectedCell.value !== null) {
                return this.value === null
                    ? this.hasNotation(selectedCell.value) !== true
                    : selectedCell.value !== this.value;
            }
        }
        return false;
    }

    public isSelected(selectedCells: SudokuCell[]): boolean {
        if(selectedCells.length > 0) {
            const [selectedCell] = selectedCells.slice(-1);
            return this.row === selectedCell.row && this.column === selectedCell.column;
        }
        return false;
    }

    public isValueSelected(selectedCells: SudokuCell[]): boolean {
        if (selectedCells.length === 1) {
            const selectedCell = selectedCells.find(x => x !== undefined);
            return selectedCell !== undefined 
                && this.value !== null 
                && this.value === selectedCell.value;
        }
        return false;
    }

    public isMultiSelected(selectedCells: SudokuCell[]): boolean {
        if (selectedCells.length > 1) {
            const cells = selectedCells.slice(0, -1);
            return this.value === null && cells.find(cell => {
                return cell.row === this.row && cell.column === this.column;
            }) !== undefined;
        }
        return false;
    }

    /**
     * Toggles the notation for the given number.
     * If the note is equal to the internally stored note, it will be erased.
     * Otherwise, the note will be set to the one passed as an argument.
     * @param number 
     * @param note 
     */
    public toggleNotation(number: number, note: number): void {
        const index = this.options.findIndex(numberElement => {
            return number === numberElement.number;
        });
        if (index >= 0) {
            this.options[index].note = 
                note === this.options[index].note 
                ? SudokuCell.EMPTY 
                : note;
        }
    }
}