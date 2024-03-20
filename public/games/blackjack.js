const sixDecks = new Deck(6);
let dealer = 0;
let dealerA = 0;
let hiddenCard;

let player = 0;
let playerA = 0;
let canSplit = false;

let bets = 0;
let isFirstCall = true;
let decision = false;

function loadBlackJack() {
  const beginBJbtn = createBtn("startbtn", "", "PLAY");
  appendElements([beginBJbtn]);
  beginBJbtn.addEventListener("click", async () => {
    beginBJbtn.remove();
    resetGame();
    placeBet();
  });
}

function resetGame() {
  dealer = 0;
  dealerA = 0;
  player = 0;
  playerA = 0;
  canSplit = false;
  bets = 0;
  isFirstCall = true;
}

async function placeBet() {
  const placeBets = createEl("p", `Place Your Bets`, "titleBj");
  const amountBet = createEl("h3", `Your bet is: ${bets}`);
  const timer = createEl("h3", `Bets will close in - 13s`);
  const imgsBG = createEl("div", "", "smothBg");
  const img1 = createImage("../imgs/chips/1.png", "betsImg", "1");
  const img5 = createImage("../imgs/chips/5.png", "betsImg", "5");
  const img10 = createImage("../imgs/chips/10.png", "betsImg", "10");
  const img50 = createImage("../imgs/chips/50.png", "betsImg", "50");
  const img100 = createImage("../imgs/chips/100.png", "betsImg", "100");
  const img500 = createImage("../imgs/chips/500.png", "betsImg", "500");
  const allBetsBtn = [img1, img5, img10, img50, img100, img500];
  allBetsBtn.forEach((btn) => {
    imgsBG.appendChild(btn);
    btn.addEventListener("click", (x) => {
      bets = bets + Number(x.target.id);
      amountBet.textContent = `Your bet is: ${bets}`;
      removeBets();
    });
  });
  appendElements([placeBets, amountBet, timer, imgsBG]);
  // Time to place bet 13sec
  await timeToBet(timer, allBetsBtn);
  //
  removeElements([placeBets, amountBet, timer]);
  //

  dealing(imgsBG);
}

async function dealing(imgsBG) {
  const dealingText = createEl("h3", "DEALING...", "textDealing");
  imgsBG.classList.add("dealing");
  imgsBG.appendChild(dealingText);
  await delay(1500);

  const dealerBox = createEl("div", "", "dealerBox");
  const infoBj = createEl("div", "", "infoBj");
  const playerBox = createEl("div", "", "playerBox");
  appendElements([dealerBox, infoBj, playerBox]);

  let evalValues = [];

  for (let i = 1; i <= 4; i++) {
    await delay(1000);
    let nCard = sixDecks.cards.shift();
    switch (i) {
      case 1:
        const card1 = createImage(
          `../imgs/cards/${nCard.value + nCard.suit}.png`,
          "cards"
        );
        playerBox.appendChild(card1);
        evalValues.push(nCard.value);
        await checkValue(nCard.value, "player");
        break;
      case 2:
        const card2 = createImage(
          `../imgs/cards/${nCard.value + nCard.suit}.png`,
          "cards"
        );
        dealerBox.appendChild(card2);
        await checkValue(nCard.value, "dealer");
        break;
      case 3:
        const card3 = createImage(
          `../imgs/cards/${nCard.value + nCard.suit}.png`,
          "cards"
        );
        playerBox.appendChild(card3);
        evalValues.push(nCard.value);
        await checkValue(nCard.value, "player");
        console.log(evalValues);
        break;
      case 4:
        hiddenCard = createImage(
          `../imgs/cards/${nCard.value + nCard.suit}.png`,
          "cards"
        );
        const card4 = createImage(`../imgs/cards/back.png`, "cards");
        dealerBox.appendChild(card4);
        await checkValue(nCard.value, "dealer");
        break;
      default:
        console.log("Something went wrong!");
        break;
    }
  }

  if (evalValues[0] === evalValues[1]) {
    canSplit = true;
  }
  await nextMove(dealingText, dealerBox, infoBj, playerBox);
}

async function nextMove(dealingText, dealerBox, infoBj, playerBox) {
  const chooseBg = createEl("div", "", "");
  const chooseText = createEl("h3", "", "blackBg");
  const double = createBtn("double", "", "DOUBLE");
  const hit = createBtn("hit", "", "", "+ <br /> HIT");
  const stand = createBtn("stand", "", "", "- <br /> STAND");
  const split = createBtn("", "defaultBtn", "SPLIT");

  // Event listeners for buttons
  if (bets > 0) {
    double.addEventListener("click", () => {
      handleDouble(playerBox, chooseText);
      decision = true;
    });
  }

  hit.addEventListener("click", () => {
    handleHit(playerBox, chooseText);
  });

  stand.addEventListener("click", () => {
    handleStand(chooseText);
    decision = true;
  });

  if (canSplit) {
    split.id = "split";
    split.addEventListener("click", () => {
      handleSplit(playerBox, chooseText);
      decision = true;
    });
  }

  [chooseText, double, hit, stand, split].forEach((x) =>
    chooseBg.appendChild(x)
  );
  infoBj.appendChild(chooseBg);
  decision = await makeYourMove(chooseText, dealingText);

  if (decision) {
    [double, split].forEach((x) => x.remove());
  }
}

//DOUBLE
function handleDouble(playerBox, chooseText) {
  bets *= 2;
  console.log(bets);
}

//HIT
async function handleHit(playerBox, chooseText) {
  let nCard = sixDecks.cards.shift();
  const nextCard = createImage(
    `../imgs/cards/${nCard.value + nCard.suit}.png`,
    "cards"
  );
  await checkValue(nCard.value, "player");
  playerBox.appendChild(nextCard);
  if (player > 21) {
    decision = true;
  }
}

//STAND
function handleStand(chooseText) {
  console.log("Stand");
}

//SPLIT
function handleSplit(event) {
  console.log("Split");
}

async function makeYourMove(a, b) {
  a.textContent = "MAKE YOUR DECISION - 60s";
  b.textContent = "😎";

  for (let i = 60; i >= 0; i--) {
    if (decision) {
      a.textContent = "";
      return true;
    }
    await delay(1000);
    a.textContent = `MAKE YOUR DECISION - ${i}s`;
    if (i === 0) {
      a.textContent = `Time is up!`;
      console.log("Still running.");
      return handleStand();
    }
  }
}

async function checkValue(value, who) {
  const faceCards = { J: 10, Q: 10, K: 10 };
  const numericValue = faceCards[value] || (value === "A" ? 10 : Number(value));

  if (who === "dealer") {
    dealer += numericValue;
    dealerA += value === "A";
  } else if (who === "player") {
    player += numericValue;
    playerA += value === "A";
  }
}

async function timeToBet(t, btns) {
  for (let i = 2; i >= 0; i--) {
    await delay(1000);
    t.textContent = `Bets will close in - ${i}s`;
    if (i == 0) {
      await delay(1000);
      btns.forEach((btn) => btn.remove());
      removeBets("a");
      t.textContent = `Bets are closed.`;
      await delay(500);
    }
  }
}

function removeBets(a) {
  const delBet = document.querySelector(".betsRemove");
  if (isFirstCall && !a) {
    isFirstCall = false;
    const delBets = createBtn("", "betsRemove", "Remove All Bets");
    appendElements([linebreak, linebreak, delBets]);
    delBets.addEventListener("click", () => {
      bets = 0;
      block.children[1].textContent = `Your bet is: ${bets}`;
      delBets.remove();
      isFirstCall = true;
    });
  } else if (a && delBet) {
    delBet.remove();
  }
}
