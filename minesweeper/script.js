window.addEventListener("load", setup, false);

let buttonArray;
let flagCount;
let gameOver;
let firstClick;
let reset;
let timerId;
const NOBOMBMODE = false;

let isValidClick = false;
let isClicking = false;

let boardLength;
let numPlums;

let time = 0;

const BEGINNER = 0;
const INTERMEDIATE = 1;
const EXPERT = 2;

let blockColor = "#808080";
let blockClickColor = "#666";
let blockHoverColor = "#ccc";
let colorArray = [
  "",
  "blue",
  "green",
  "red",
  "purple",
  "darkred",
  "teal",
  "black",
  "grey",
];

let hitPlumSfx = new Audio("hitPlum.mp3");
hitPlumSfx.volume = 0.08;
let clickSfx = new Audio("click.mp3");
clickSfx.volume = 0.1;

function setup() {
  reset = document.getElementById("button");
  reset.addEventListener("click", restart, false);

  document.getElementById("beginner").addEventListener("click", start, false);
  document
    .getElementById("intermediate")
    .addEventListener("click", start, false);
  document.getElementById("expert").addEventListener("click", start, false);

  document
    .getElementById("table")
    .addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

  document.addEventListener(
    "mouseup",
    function (e) {
      if (e.button == 0) {
        isValidClick = false;
        isClicking = false;
      }
    },
    false
  );

  document.addEventListener(
    "mousedown",
    function (e) {
      if (e.button == 0) isClicking = true;
    },
    false
  );

  loadScores();
  start();
}

function start(e) {
  if (e != undefined) {
    let beginner = document.getElementById("beginner");
    let intermediate = document.getElementById("intermediate");
    let expert = document.getElementById("expert");
    let target = e.target;
    if (target != beginner) beginner.removeAttribute("data-checked");
    if (target != intermediate) intermediate.removeAttribute("data-checked");
    if (target != expert) expert.removeAttribute("data-checked");

    target.setAttribute("data-checked", 1);
  }
  setBoardSize();
  createTable();
  restart();
}

function setBoardSize() {
  if (document.getElementById("beginner").dataset.checked) {
    boardLength = 9;
    numPlums = 10;
  } else if (document.getElementById("intermediate").dataset.checked) {
    boardLength = 15;
    numPlums = 40;
  } else {
    boardLength = 20;
    numPlums = 70;
  }
  document.getElementById("flagCount").innerText = numPlums;
  document.getElementById("totalPlums").innerText = numPlums;
  document.getElementById("boardSize").innerText =
    boardLength + "x" + boardLength;
}

function createTable() {
  buttonArray = [];
  for (let i = 0; i < boardLength; ++i) {
    buttonArray[i] = [];
  }

  let table = document.getElementById("table");
  table.innerHTML = "";
  for (let i = 0; i < boardLength; ++i) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < boardLength; ++j) {
      buttonArray[i][j] = createBlock(tr, false, i, j, false, false);
    }
  }
}

function createBlock(parent, isBomb, row, col, updated, flagged) {
  let elem = document.createElement("td");
  parent.appendChild(elem);
  let b = {
    elem: elem,
    isBomb: isBomb,
    row: row,
    col: col,
    updated: updated,
    flagged: flagged,
  };
  elem.addEventListener(
    "mouseup",
    function (e) {
      if (e.button == 0 && isValidClick) {
        updateBlock(e, b, true);
      }
    },
    false
  );
  elem.addEventListener(
    "mousedown",
    function (e) {
      if (e.button == 0 && !b.updated) {
        elem.style.backgroundColor = blockClickColor;
        isValidClick = true;
      }
    },
    false
  );
  elem.addEventListener(
    "contextmenu",
    function (e) {
      flag(e, b);
    },
    false
  );
  elem.addEventListener("mouseover", function (e) {
    if (!b.updated) {
      if (isValidClick) elem.style.backgroundColor = blockClickColor;
      else if (!isClicking) elem.style.backgroundColor = blockHoverColor;
    }
  });
  elem.addEventListener("mouseout", function (e) {
    if (!b.updated) elem.style.backgroundColor = blockColor;
  });
  return b;
}
function startTimer() {
  timerId = window.setInterval(function () {
    setTime(++time);
  }, 1000);
}

function cancelTimer() {
  window.clearInterval(timerId);
}

function updateBlock(e, b, shouldPlaySound = false) {
  if (b == undefined) {
    return;
  }
  if (gameOver || b.updated) {
    return;
  }
  if (firstClick) {
    placePlums(b.row, b.col);
    firstClick = false;
    startTimer();
  }
  if (b.flagged) {
    flag(e, b);
  }
  b.elem.style.backgroundColor = "white";
  let numPlums = getNumPlumsAround(b.row, b.col);
  b.elem.innerText = numPlums == 0 ? "" : numPlums;
  b.elem.style.color = colorArray[numPlums];
  b.elem.style.fontWeight = "bold";
  b.elem.style.fontSize = "18px";
  b.updated = true;
  if (numPlums == 0 && !b.isBomb) {
    if (b.row > 0) {
      updateBlock(e, buttonArray[b.row - 1][b.col]);
      updateBlock(e, buttonArray[b.row - 1][b.col + 1]);
      updateBlock(e, buttonArray[b.row - 1][b.col - 1]);
    }
    if (b.row + 1 < boardLength) {
      updateBlock(e, buttonArray[b.row + 1][b.col + 1]);
      updateBlock(e, buttonArray[b.row + 1][b.col]);
      updateBlock(e, buttonArray[b.row + 1][b.col - 1]);
    }
    updateBlock(e, buttonArray[b.row][b.col - 1]);
    updateBlock(e, buttonArray[b.row][b.col + 1]);
  }

  if (b.isBomb) {
    setGameOver(false);
    return;
  } else {
    if (shouldPlaySound) {
      playSound("click.mp3", 0.1);
    }
  }
  if (isGameWon()) {
    setGameOver(true);
  }
}

function playSound(file, volume) {
  let audio = new Audio(file);
  audio.volume = volume;
  audio.play();
}

function setGameOver(didWin) {
  gameOver = true;
  cancelTimer();
  if (didWin) {
    setGameStatus("You Win!");

    trySetHighScore(time);
  } else {
    setGameStatus("Game Over!");
    hitPlumSfx.play();
    revealBombs();
  }
}

function isGameWon() {
  for (let i = 0; i < boardLength; ++i) {
    for (let j = 0; j < boardLength; ++j) {
      if (
        buttonArray[i][j].updated == false &&
        buttonArray[i][j].isBomb == false
      )
        return false;
    }
  }
  return true;
}

function flag(e, b) {
  if (gameOver || b.updated) {
    return;
  }
  if (b.flagged) {
    b.elem.style.backgroundImage = "";
    b.flagged = false;
    flagCount--;
  } else {
    b.elem.style.backgroundImage = "url(flag.ico)";
    b.elem.style.backgroundSize = "contain";
    b.flagged = true;
    flagCount++;
  }
  document.getElementById("flagCount").innerText = numPlums - flagCount;
}

function randomInt() {
  return Math.floor(Math.random() * boardLength);
}

function revealBombs() {
  for (let i = 0; i < boardLength; ++i) {
    for (let j = 0; j < boardLength; ++j) {
      if (buttonArray[i][j].isBomb) {
        buttonArray[i][j].elem.style.backgroundImage = "url(mapleplum.png)";
        buttonArray[i][j].elem.style.backgroundSize = "contain";
      }
    }
  }
}

function getNumPlumsAround(row, col) {
  let count = 0;
  if (isBomb(row, col)) return 0;
  if (isBomb(row - 1, col)) ++count;

  if (isBomb(row - 1, col + 1)) ++count;

  if (isBomb(row, col + 1)) ++count;

  if (isBomb(row + 1, col + 1)) ++count;

  if (isBomb(row + 1, col)) ++count;

  if (isBomb(row + 1, col - 1)) ++count;

  if (isBomb(row, col - 1)) ++count;

  if (isBomb(row - 1, col - 1)) ++count;
  return count;
}

function isBomb(row, col) {
  if (row >= boardLength || row < 0 || col >= boardLength || col < 0)
    return false;
  return buttonArray[row][col].isBomb;
}

function placePlums(row, col) {
  if (NOBOMBMODE) {
    return;
  }
  let plumRow = randomInt();
  let plumCol = randomInt();
  let count = 0;
  while (count < numPlums) {
    if (
      !buttonArray[plumRow][plumCol].isBomb &&
      (plumCol != col || plumRow != row)
    ) {
      buttonArray[plumRow][plumCol].isBomb = true;
      ++count;
    }

    plumRow = randomInt();
    plumCol = randomInt();
  }
}

function restart(e) {
  for (let i = 0; i < boardLength; ++i) {
    for (let j = 0; j < boardLength; ++j) {
      buttonArray[i][j].elem.style.backgroundImage = "";
      buttonArray[i][j].elem.innerText = "";
      buttonArray[i][j].elem.style.backgroundColor = blockColor;
      buttonArray[i][j].elem.style.color = blockColor;
      buttonArray[i][j].isBomb = false;
      buttonArray[i][j].updated = false;
      buttonArray[i][j].flagged = false;
    }
  }
  cancelTimer();
  gameOver = false;
  firstClick = true;
  flagCount = 0;
  document.getElementById("flagCount").innerText = numPlums;
  setGameStatus("");
  setTime(0);
}

function setGameStatus(val) {
  document.getElementById("gameStatus").innerText = val;
}

function setTime(val) {
  time = val;
  document.getElementById("time").innerText = time;
}

function getCurrentDifficulty() {
  if (document.getElementById("beginner").checked) {
    return BEGINNER;
  } else if (document.getElementById("intermediate").checked) {
    return INTERMEDIATE;
  } else if (document.getElementById("expert").checked) {
    return EXPERT;
  } else {
    console.error("you fucked it");
  }
}

function trySetHighScore(score) {
  let difficulty = getCurrentDifficulty();
  let key;
  switch (difficulty) {
    case BEGINNER:
      key = "beginnerHS";
      break;
    case INTERMEDIATE:
      key = "intermediateHS";
      break;
    case EXPERT:
      key = "expertHS";
      break;
    default:
      break;
  }
  let value = localStorage.getItem(key);
  if (typeof value != "string" || score < Number(value)) {
    localStorage.setItem(key, score);
    loadScores();
  }
}

function loadScores() {
  const arr = ["beginnerHS", "intermediateHS", "expertHS"];
  for (let i in arr) {
    let key = arr[i];
    let value = localStorage.getItem(key);
    if (typeof value != "string") value = "none";
    document.getElementById(key).innerText = "";
  }
}
