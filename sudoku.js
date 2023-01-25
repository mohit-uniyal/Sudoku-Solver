//code for solving sudoku

function isValid(grid, row, col) {
    let digit = grid[row][col];
    for (let i = 0; i < 9; i++) {
        if (i != row && grid[i][col] == digit) {
            return false;
        }
    }
    for (let j = 0; j < 9; j++) {
        if (j != col && grid[row][j] == digit) {
            return false;
        }
    }
    let sr = Math.floor(row / 3) * 3;
    let sc = Math.floor(col / 3) * 3;
    for (let i = sr; i < sr + 3; i++) {
        for (let j = sc; j < sc + 3; j++) {
            if (i != row && j != col && grid[i][j] == digit) {
                return false;
            }
        }
    }
    return true;
}

function solve(grid, row, col) {
    if (row == 9) {
        return true;
    }
    if (col == 9) {
        return solve(grid, row + 1, 0);
    }
    if (grid[row][col] != "0") {
        return solve(grid, row, col + 1);
    }
    for (let d = "1"; d <= "9"; d++) {
        grid[row][col] = d;
        if (isValid(grid, row, col)) {
            if (solve(grid, row, col + 1)) {
                return true;
            }
        }
        grid[row][col] = "0";
    }
    return false;
}

// Code to reset the sudoku grid
let reset = document.getElementById("reset");
reset.addEventListener("click", function () {
    let cell = document.getElementsByClassName("cells");
    for (let i = 0; i < cell.length; i++) {
        cell[i].value = "";
    }
})

// code to submit the grid and returning the solved grid
let grid = [[], [], [], [], [], [], [], [], []];
let submit = document.getElementById("submit");
submit.addEventListener("click", function () {
    let cell = document.getElementsByClassName("cells");
    let k = 0;
    for (let sr = 0; sr < 3; sr++) {
        for (let sc = 0; sc < 3; sc++) {
            for (let i = sr * 3; i < sr * 3 + 3; i++) {
                for (let j = sc * 3; j < sc * 3 + 3; j++) {
                    grid[i][j] = cell[k].value;
                    if (grid[i][j] == "") {
                        grid[i][j] = "0";
                    }
                    k++;
                }
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] != "0") {
                if (!isValid(grid, i, j)) {
                    alert("Grid not valid");
                    return;
                }
            }
        }
    }
    if (solve(grid, 0, 0)) {
        k = 0;
        for (let sr = 0; sr < 3; sr++) {
            for (let sc = 0; sc < 3; sc++) {
                for (let i = sr * 3; i < sr * 3 + 3; i++) {
                    for (let j = sc * 3; j < sc * 3 + 3; j++) {
                        cell[k].value = grid[i][j];
                        k++;
                    }
                }
            }
        }
    } else {
        alert("Grid not valid");
    }
})
