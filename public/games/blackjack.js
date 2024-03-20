const sixDecks = new Deck(6);
let dealer = 0;
let dealerA = 0;

let player = 0;
let playerA = 0;
let canSplit = 0;

let bets = 0;
let isFirstCall = true;

function loadBlackJack() {
  const beginBJbtn = createBtn("startbtn", "", "PLAY");
  appendElements([beginBJbtn]);
  beginBJbtn.addEventListener("click", async () => {
    beginBJbtn.remove();
    dealer = 0;
    dealerA = 0;
    player = 0;
    playerA = 0;
    canSplit = 0;
    bets = 0;
    isFirstCall = true;
    placeBet();
  });
}

async function startBJ() {}

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
  const dealingText = createEl("h3", "Dealing...", "textDealing");
  imgsBG.classList.add("dealing");
  imgsBG.appendChild(dealingText);
  await delay(1500);

  const dealerBox = createEl("div", "", "dealerBox");
  const infoBj = createEl("div", "", "infoBj");
  const playerBox = createEl("div", "", "playerBox");
  appendElements([dealerBox, infoBj, playerBox]);

  let evalValues = [];

  let hiddenCard;
  for (let i = 1; i <= 4; i++) {
    await delay(100);
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
    canSplit++;
  }
  await nextMove(dealingText, dealerBox, infoBj, playerBox);
}

async function nextMove(dealingText, dealerBox, infoBj, playerBox) {
  const chooseBg = createEl("div", "", "smothBg");
  // Stopped here.
  const chooseText = createEl("h3", "");
  dealingText.textContent = " Hello";
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
  for (let i = 1; i >= 0; i--) {
    await delay(100);
    t.textContent = `Bets will close in - ${i}s`;
    if (i == 0) {
      await delay(100);
      btns.forEach((btn) => btn.remove());
      removeBets("a");
      t.textContent = `Bets are closed !`;
      await delay(150);
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
