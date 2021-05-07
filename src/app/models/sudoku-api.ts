export interface SudokuJson {
    board: number[][];
}

export class SudokuResponse {
    constructor(
        private board: number[][] = []
    ) {}

    public static fromJson(json: SudokuJson): SudokuResponse {
        return new SudokuResponse(json.board);
    }

    public getValue(columnNumber: number, rowNumber: number): number|null {
        if (rowNumber in this.board) {
            const row = this.board[rowNumber];
            if (
                columnNumber in this.board[rowNumber] 
                && this.board[rowNumber][columnNumber] !== 0
            ) {
                return this.board[rowNumber][columnNumber];
            }
        }
        return null;
    }
}