const startBtn = document.querySelector("#startbtn");
const allRps = document.querySelectorAll(".rps");
const block = document.querySelector("#content");
const linebreak = document.createElement("br");
const playAgain = document.createElement("button");

const btnAudio = new Audio("./sound/button.mp3");
btnAudio.volume = 0.5;

const roundInfo = block.children[1];
const instruction = block.children[3];

let playerChoice = "";
let round = 1;

startBtn.addEventListener("click", () => {
  btnAudio.play();
  setTimeout(() => {
    allRps.forEach((btn) => btn.classList.remove("gameon"));
    startBtn.classList.add("gameon");
    roundInfo.textContent = `Round ${round}`;
    block.children[2].classList.add("gameon");
    instruction.textContent = "Choose:";
  }, 200);
});

playAgain.addEventListener("click", () => {
  allRps.forEach((btn) => btn.classList.remove("gameon"));
  round++;
  playAgain.remove();
});

allRps.forEach((btn) => {
  btn.addEventListener("mouseover", (event) => {
    event.target.src = event.target.src.replace(".png", "2.png");
  });
  btn.addEventListener("mouseout", (event) => {
    event.target.src = event.target.src.replace("2.png", ".png");
  });
  btn.addEventListener("click", (event) => {
    playerChoice = event.target.id;
    showChoice();
  });
});

async function showChoice() {
  allRps.forEach((btn) => btn.classList.add("gameon"));
  const handOne = createImage("../imgs/123.png", "handOne");
  const handTwo = createImage("../imgs/321.png", "handTwo");

  appendElements([handOne, handTwo]);
  instruction.textContent = "3";
  await delay(1000);
  instruction.textContent = "2";
  await delay(1000);
  instruction.textContent = "1";
  await delay(700);
  instruction.textContent = "GOOOO!!!";

  await delay(500);
  removeElements([handOne, handTwo]);
  gameStart();
  allRps.forEach((btn) => btn.remove());
  choices(1, 2);
}

async function gameStart() {
  const rps = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * 3);
  const pcChoice = rps[random];
  const winMessage = {
    rock: "paper wins over rock",
    paper: "scissors wins over paper",
    scissors: "rock wins over scissors",
  };

  if (playerChoice === pcChoice) {
    console.log(`It's a Draw (${playerChoice} and ${pcChoice})`);
  } else if (
    (playerChoice === "rock" && pcChoice === "scissors") ||
    (playerChoice === "paper" && pcChoice === "rock") ||
    (playerChoice === "scissors" && pcChoice === "paper")
  ) {
    console.log(`You win! ${playerChoice} wins over ${pcChoice}`);
    await updateScore();
    await rankData();
  } else {
    console.log(`Computer wins! ${winMessage[pcChoice]}`);
  }
}

async function updateScore() {
  await fetch("/scorerps/1?k=8*ej1^3d9K:J4zn136", {
    method: "PUT",
  });
}

async function choices(p, c) {
  const choices = ["rockHand", "paperHand", "scissorsHand"];
  const pc = createImage(`../imgs/${choices[p]}.png`, "choices");
  const py = createImage(`../imgs/${choices[c]}.png`, "choices");

  appendElements([pc, py, linebreak, playAgain]);
  playAgain.id = "playAgain";
  playAgain.textContent = "Again";
}

function createImage(src, id) {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add(id);
  return img;
}

function appendElements(elements) {
  elements.forEach((element) => block.appendChild(element));
}

function removeElements(elements) {
  elements.forEach((element) => element.remove());
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
