// Board and Squares
const grid = document.querySelector(".game-grid");
const scoreDisplay = document.getElementById("score");
const width = 8;
const squares = [];
let score = 0;

// Colors
const candyColors = [
  "var(--kinoko-pink)",
  "var(--kinoko-purple)",
  "var(--kinoko-white)",
  "var(--kinoko-blue)",
];

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const squareContainer = document.createElement("div");
    const square = document.createElement("div");
    square.classList.add("kinoko");
    square.classList.toggle("appear");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    setColors(square);
    grid.appendChild(squareContainer);
    squareContainer.appendChild(square);
    squares.push(square);
  }
}
createBoard();

function setColors(square) {
  let randomNumberColor = Math.floor(Math.random() * candyColors.length);
  square.style.backgroundColor = candyColors[randomNumberColor];
}

// Drag the candies
let colorBeingDragged;
let colorBeingReplaced;
let squareIDBeingDragged;
let squareIDBeingReplaced;

squares.forEach((square) => square.addEventListener("dragstart", dragStart));
squares.forEach((square) => square.addEventListener("dragend", dragEnd));
squares.forEach((square) => square.addEventListener("dragover", dragOver));
squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
squares.forEach((square) => square.addEventListener("drop", dragDrop));

function dragStart() {
  colorBeingDragged = this.style.backgroundColor;
  squareIDBeingDragged = parseInt(this.id);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  this.style.backgroundColor = "";
}

function dragEnd() {
  // Valid moves
  let validMoves = [
    squareIDBeingDragged - 1,
    squareIDBeingDragged - width,
    squareIDBeingDragged + 1,
    squareIDBeingDragged + width,
  ];
  let validMove = validMoves.includes(squareIDBeingReplaced);

  if (squareIDBeingReplaced && validMove) {
    squareIDBeingReplaced = null;
  } else if (squareIDBeingReplaced && !validMove) {
    squares[squareIDBeingReplaced].style.backgroundColor = colorBeingReplaced;
    squares[squareIDBeingDragged].style.backgroundColor = colorBeingDragged;
  }
}

function dragDrop() {
  colorBeingReplaced = this.style.backgroundColor;
  squareIDBeingReplaced = parseInt(this.id);
  squares[squareIDBeingDragged].style.backgroundColor = colorBeingReplaced;
  squares[squareIDBeingReplaced].style.backgroundColor = colorBeingDragged;
}

// Checking for matches

// Score
function setScore(number) {
  score += number * 100;
  scoreDisplay.innerHTML = score;
}

// Row of Three
function checkRowForThree() {
  for (let i = 0; i <= 61; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

    if (notValid.includes(i)) continue;

    if (
      rowOfThree.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      setScore(3);
      rowOfThree.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}

// Column of Three
function checkColumnForThree() {
  for (let i = 0; i <= 47; i++) {
    let columnOfThree = [i, i + width, i + width * 2];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    if (
      columnOfThree.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      setScore(3);
      columnOfThree.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}

// Row of Four
function checkRowForFour() {
  for (let i = 0; i <= 60; i++) {
    let rowOfFour = [i, i + 1, i + 2, i + 3];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    const notValid = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55,
    ];

    if (notValid.includes(i)) continue;

    if (
      rowOfFour.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      setScore(4);
      rowOfFour.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}

// Column of Four
function checkColumnForFour() {
  for (let i = 0; i <= 39; i++) {
    let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    if (
      columnOfFour.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      setScore(4);
      columnOfFour.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}

// Row of Five

function checkRowForFive() {
  for (let i = 0; i <= 59; i++) {
    let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];

    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    const notValid = [
      4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38,
      39, 44, 45, 46, 47, 52, 53, 54, 55,
    ];

    if (notValid.includes(i)) continue;

    if (
      rowOfFive.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      setScore(5);
      rowOfFive.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}

// Column of Five
function checkColumnForFive() {
  for (let i = 0; i <= 31; i++) {
    let columnOfFive = [
      i,
      i + width,
      i + width * 2,
      i + width * 3,
      i + width * 4,
    ];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    if (
      columnOfFive.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      setScore(5);
      columnOfFive.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}

// Move Candies down
function moveSquareBelow() {
  for (let i = 0; i <= 55; i++) {
    if (squares[i + width].style.backgroundColor === "") {
      squares[i + width].style.backgroundColor =
        squares[i].style.backgroundColor;
      squares[i].style.backgroundColor = "";
    }

    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
    const isFirstRow = firstRow.includes(i);
    if (isFirstRow && squares[i].style.backgroundColor === "") {
      setColors(squares[i]);
    }
  }
}

window.setInterval(function () {
  moveSquareBelow();
  checkRowForFive();
  checkColumnForFive();
  checkRowForFour();
  checkColumnForFour();
  checkRowForThree();
  checkColumnForThree();
}, 100);
