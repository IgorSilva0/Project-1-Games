const sixDecks = new Deck(6);
const dealer = [];
const player = [];
let bets = 0;
let isFirstCall = true;

function loadBlackJack() {
  const beginBJbtn = createBtn("startbtn", "", "PLAY");
  appendElements([beginBJbtn]);
  beginBJbtn.addEventListener("click", async () => {
    beginBJbtn.remove();
    bets = 0;
    isFirstCall = true;
    startBJ();
  });
}

async function startBJ() {
  await placeBet();
}

async function placeBet() {
  const placeBet = createEl("p", `Place Your Bets`);
  const amountBet = createEl("h3", `Your bet is: ${bets}`);
  amountBet.style.paddingTop = "20px";
  const timer = createEl("h4", `Bets will close in - 13s`);

  const imgsBG = createEl("div", "");
  imgsBG.style.backgroundImage =
    "linear-gradient(to right, transparent, black, transparent)";
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
  appendElements([placeBet, amountBet, timer, imgsBG]);
  // Time to place bet
  await timeToBet(timer, allBetsBtn);
  // Stopped here, What to do after bets closed?
}

async function timeToBet(t, btns) {
  for (let i = 1; i >= 0; i--) {
    await delay(1000);
    t.textContent = `Bets will close in - ${i}s`;
    if (i == 0) {
      await delay(200);
      btns.forEach((btn) => btn.remove());
      removeBets("a");
      t.textContent = `Bets are closed !`;
    }
  }
}

function removeBets(a) {
  const delBet = document.querySelector(".betsRemove");
  if (isFirstCall) {
    isFirstCall = false;
    const delBets = createBtn("", "betsRemove", "Remove All Bets");
    appendElements([linebreak, linebreak, delBets]);
    delBets.addEventListener("click", () => {
      bets = 0;
      block.children[1].textContent = `Your bet is: ${bets}`;
      delBets.remove();
      isFirstCall = true;
    });
  } else if (a) {
    delBet.remove();
  }
}
