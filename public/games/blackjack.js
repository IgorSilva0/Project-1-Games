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
let handStatus = false;

let isDoubleInProgress = false;
let isHitInProgress = false;
let isStandInProgress = false;
let isSplitInProgress = false;

let evalValues = [];
let evalDealer = [];

function loadBlackJack() {
  const block = document.querySelector("#content");
  block.innerHTML = "";
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
  decision = false;
  handStatus = false;
  isDoubleInProgress = false;
  isHitInProgress = false;
  isStandInProgress = false;
  isSplitInProgress = false;
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
  await delay(500);

  const dealerBox = createEl("div", "", "dealerBox");
  const infoBj = createEl("div", "", "infoBj");
  const playerBox = createEl("div", "", "playerBox");
  appendElements([dealerBox, infoBj, playerBox]);

  for (let i = 1; i <= 4; i++) {
    await delay(500);
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
        evalDealer.push(nCard.value);
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
        evalDealer.push(nCard.value);
        console.log(evalDealer);
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
  nextMove(dealingText, dealerBox, infoBj, playerBox);
}

async function nextMove(dealingText, dealerBox, infoBj, playerBox) {
  dealingText.textContent = "😎";
  const chooseBg = createEl("div", "", "");
  const chooseText = createEl("h3", "Make your decision - 60s", "blackBg");
  const double = createBtn("", "defaultBtn", "DOUBLE");
  const hit = createBtn("hit", "", "", "+ <br /> HIT");
  const stand = createBtn("stand", "", "", "- <br /> STAND");
  const split = createBtn("", "defaultBtn", "SPLIT");
  const allBtns = [double, hit, stand, split];
  // Event listeners for buttons
  if (bets > 0) {
    double.id = "double";
    double.addEventListener("click", () => {
      if (!isDoubleInProgress) {
        isDoubleInProgress = true;
        handleDouble(dealingText, dealerBox, playerBox, chooseText, allBtns);
      }
    });
  }

  hit.addEventListener("click", async () => {
    if (!isHitInProgress) {
      isHitInProgress = true;
      await handleHit(
        dealingText,
        dealerBox,
        playerBox,
        chooseText,
        allBtns
      ).then(async () => {
        isHitInProgress = false;
        if (handStatus) {
          decision = false;
          await makeYourMove(
            dealingText,
            dealerBox,
            playerBox,
            chooseText,
            allBtns
          );
        } else {
          playerBust(chooseBg);
        }
      });
    }
  });

  stand.addEventListener("click", () => {
    if (!isStandInProgress) {
      isStandInProgress = true;
      handleStand(
        dealingText,
        dealerBox,
        playerBox,
        chooseText,
        allBtns,
        chooseBg
      );
    }
  });

  if (canSplit) {
    split.id = "split";
    split.addEventListener("click", () => {
      if (!isSplitInProgress) {
        isSplitInProgress = true;
        handleSplit(dealingText, dealerBox, playerBox, chooseText, allBtns);
      }
    });
  }

  [chooseText, double, hit, stand, split].forEach((x) =>
    chooseBg.appendChild(x)
  );

  infoBj.appendChild(chooseBg);

  if (!decision) {
    decision = await makeYourMove(
      dealingText,
      dealerBox,
      playerBox,
      chooseText,
      allBtns
    );
  }
}

//DOUBLE
function handleDouble(dealingText, dealerBox, playerBox, chooseText, allBtns) {
  allBtns[0].id = "";
  decision = true;
  bets *= 2;
  console.log(bets);
}

//HIT
async function handleHit(
  dealingText,
  dealerBox,
  playerBox,
  chooseText,
  allBtns
) {
  decision = true;
  allBtns[0].id = "";
  let nCard = sixDecks.cards.shift();
  const nextCard = createImage(
    `../imgs/cards/${nCard.value + nCard.suit}.png`,
    "cards"
  );
  await checkValue(nCard.value, "player");
  chooseText.textContent = " Drawing 1 more card... ";
  await delay(1000);
  playerBox.appendChild(nextCard);
  if (playerA >= 1 && player > 21) {
    playerA--;
    player -= 10;
  }

  if (player > 21 && playerA < 1) {
    chooseText.textContent = " Player bust ";
    allBtns.forEach((x) => x.remove());
    return (handStatus = false);
  }

  return (handStatus = true);
}

//STAND
async function handleStand(
  dealingText,
  dealerBox,
  playerBox,
  chooseText,
  allBtns,
  chooseBg
) {
  chooseText.textContent = "Standing...";
  allBtns.forEach((x) => x.remove());
  decision = true;
  await delay(1000);
  chooseText.textContent = "Dealer turn...";
  await delay(1000);
  dealerBox.children[1].src = `${hiddenCard.src}`;
  dealerTurn(dealingText, dealerBox, playerBox, chooseText, chooseBg);
}

//SPLIT
function handleSplit(dealingText, dealerBox, playerBox, chooseText, allBtns) {
  decision = true;
  console.log("Split");
}

async function dealerTurn(
  dealingText,
  dealerBox,
  playerBox,
  chooseText,
  chooseBg
) {
  const playAgain = createBtn("startbtn", "", "PLAY AGAIN");
  while (dealer <= 16) {
    let nCard = sixDecks.cards.shift();
    const nextCard = createImage(
      `../imgs/cards/${nCard.value + nCard.suit}.png`,
      "cards"
    );
    evalDealer.push(nCard.value);
    await checkValue(nCard.value, "dealer");
    dealingText.textContent = "Drawing 1 more card...";
    await delay(1000);
    dealerBox.appendChild(nextCard);
    if (dealerA >= 1 && dealer > 21) {
      dealerA--;
      dealer -= 10;
    }
    await delay(1000);
    if (dealer > 21 && dealerA < 1) {
      dealingText.textContent = " Dealer bust ";
      chooseText.textContent = " You WIN! ";
      break;
    }
    if (dealer >= 17 && dealer < 21) {
      break;
    }
  }
  if (dealer >= 17 && dealer <= 21) {
    checkResult(dealingText, chooseText);
  }
  await delay(1000);
  chooseBg.appendChild(playAgain);
  playAgain.addEventListener("click", () => {
    loadBlackJack();
  });
}

async function checkResult(dealingText, chooseText) {
  if (dealer === player) {
    dealingText.textContent = " 😲 ";
    chooseText.textContent = " It`s a Tie! ";
  }
  if (dealer > player) {
    dealingText.textContent = " 🤑 ";
    chooseText.textContent = " Dealer Wins! ";
  } else {
    dealingText.textContent = " 😰 ";
    chooseText.textContent = " You Win! ";
  }
}

async function makeYourMove(
  dealingText,
  dealerBox,
  playerBox,
  chooseText,
  allBtns
) {
  for (let i = 59; i >= 0; i--) {
    await delay(1000);
    if (decision) {
      return;
    }
    chooseText.textContent = `Make your decision - ${i}s`;
    if (i === 0) {
      chooseText.textContent = `Time is up!`;
      console.log("Still running.");
      return handleStand(
        dealingText,
        dealerBox,
        playerBox,
        chooseText,
        allBtns
      );
    }
  }
}

async function checkValue(value, who) {
  const faceCards = { J: 10, Q: 10, K: 10 };
  const numericValue = faceCards[value] || (value === "A" ? 11 : Number(value));

  if (who === "dealer") {
    dealer += numericValue;
    dealerA += value === "A";
  } else if (who === "player") {
    player += numericValue;
    playerA += value === "A";
  }
}

async function timeToBet(t, btns) {
  for (let i = 1; i >= 0; i--) {
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

async function playerBust(chooseBg) {
  let result = "";
  if (bets === 0) {
    result = "ZERO";
  } else {
    result = bets;
  }
  const text = createEl("h1", `YOU LOSE : ${result} CHIPS.`, "loseBg");
  await delay(1000);
  chooseBg.appendChild(text);
  await delay(1000);
  const playAgain = createBtn("startbtn", "", "PLAY AGAIN");
  chooseBg.appendChild(playAgain);
  playAgain.addEventListener("click", () => {
    loadBlackJack();
  });
}
