const block = document.querySelector("#content");
const btnAudio = new Audio("./sound/button.mp3");
btnAudio.volume = 0.2;
let instruction = "";
let playerChoice = "";
let round = 1;

function loadRPS() {
  block.style.backgroundImage = "url('./imgs/bg.jpg')";
  block.innerHTML = "";
  const title = createEl("p", "Rock, Paper and Scissors");
  const h3 = createEl("h3", "Welcome to the Game!");
  const rules = createImage("./imgs/rps.png");
  rules.style.width = "150px";
  rules.style.height = "150px";
  instruction = createEl("h4", "Are you ready to begin?");
  const goBtn = createBtn("startbtn", "", "PLAY");
  appendElements([title, h3, rules, instruction, goBtn]);
  rpsLoaded(goBtn);
}

function rpsLoaded(go) {
  if (!go) {
    const hand1 = createImage("./imgs/rockHand.png", "rps", "rock");
    const hand2 = createImage("./imgs/paperHand.png", "rps", "paper");
    const hand3 = createImage("./imgs/scissorsHand.png", "rps", "scissors");
    block.children[1].textContent = `Round ${round}`;
    block.children[2].classList.add("gameon");
    instruction.textContent = "Choose:";
    instruction.style.color = "white";
    appendElements([hand1, hand2, hand3]);
    timeToChoose(hand1, hand2, hand3);
  } else {
    go.addEventListener("click", () => {
      btnAudio.play();
      setTimeout(() => {
        const hand1 = createImage("./imgs/rockHand.png", "rps", "rock");
        const hand2 = createImage("./imgs/paperHand.png", "rps", "paper");
        const hand3 = createImage("./imgs/scissorsHand.png", "rps", "scissors");
        go.remove();
        block.children[1].textContent = `Round ${round}`;
        block.children[2].classList.add("gameon");
        instruction.textContent = "Choose:";
        appendElements([hand1, hand2, hand3]);
        timeToChoose(hand1, hand2, hand3);
      }, 200);
    });
  }
}

function timeToChoose(a, b, c) {
  const allRps = [a, b, c];
  allRps.forEach((btn) => {
    btn.addEventListener("mouseover", (event) => {
      event.target.src = event.target.src.replace(".png", "2.png");
    });
    btn.addEventListener("mouseout", (event) => {
      event.target.src = event.target.src.replace("2.png", ".png");
    });
    btn.addEventListener("click", (event) => {
      playerChoice = event.target.id;
      threeTwoOne();
      allRps.forEach((btn) => btn.remove());
    });
  });
}

async function threeTwoOne() {
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

  await delay(700);
  removeElements([handOne, handTwo]);
  gameStart();
}

async function gameStart() {
  const rps = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * 3);
  const pcChoice = rps[random];

  if (playerChoice === pcChoice) {
    instruction.textContent = `It's a Draw, 😲 (${playerChoice} vs ${pcChoice})`;
    instruction.style.color = "yellow";
    choices(rps.indexOf(playerChoice), random, rps);
  } else if (
    (playerChoice === "rock" && pcChoice === "scissors") ||
    (playerChoice === "paper" && pcChoice === "rock") ||
    (playerChoice === "scissors" && pcChoice === "paper")
  ) {
    instruction.textContent = `You win! 🎉 ${playerChoice} wins over ${pcChoice}`;
    instruction.style.color = "#00ff6a";
    choices(rps.indexOf(playerChoice), random, rps);
    await updateScore();
    await displayRankData();
  } else {
    instruction.textContent = `Computer wins! 💩 ${rps[random]} wins over ${
      rps[rps.indexOf(playerChoice)]
    }}`;
    instruction.style.color = "red";
    choices(rps.indexOf(playerChoice), random, rps);
  }
}

async function choices(p, c, i) {
  const pc = createImage(`../imgs/${i[p]}Hand.png`, "choices", "");
  const ply = createImage(`../imgs/${i[c]}Hand.png`, "choices", "");
  const againBtn = createBtn("playAgain", "", "Again");
  const rpsMenu = createBtn("rpsMenu", "", "Menu");
  appendElements([ply, pc, linebreak, rpsMenu, againBtn]);
  rpsMenu.addEventListener("click", () => {
    round = 1;
    removeElements([ply, pc, linebreak, rpsMenu, againBtn]);
    loadRPS();
  });
  againBtn.addEventListener("click", () => {
    round++;
    removeElements([ply, pc, linebreak, rpsMenu, againBtn]);
    rpsLoaded();
  });
}
