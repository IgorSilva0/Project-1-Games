const sixDecks = new Deck(6);
const dealer = [];
const player = [];

function loadBlackJack() {
  const beginBJbtn = createBtn("startbtn", "", "PLAY");
  appendElements([beginBJbtn]);
  beginBJbtn.addEventListener("click", async () => {
    beginBJbtn.remove();
    startBJ();
  });
}

async function startBJ() {
  await placeBet();
}

async function placeBet() {
  let bets = 0;
  const placeYourBet = createEl("p", "Place Your Bets");
  const amountBet = createEl("h3", `Your bet is: ${bets}`);

  const five = createBtn("5", "btnStyle", "5");
  const ten = createBtn("10", "btnStyle", "10");
  const twenty = createBtn("20", "btnStyle", "20");
  const fifty = createBtn("50", "btnStyle", "50");
  const allBetsBtn = [five, ten, twenty, fifty].forEach((btn) => {
    btn.addEventListener("click", (x) => {
      bets = bets + Number(x.target.id);
      block.children[1].textContent = `Your bet is: ${bets}`;
    });
  });
  // Working on this , making a button to remove all bets
  //   if (bets > 0) {
  //     const removeBets = createBtn("", "btnStyle", "Remove All Bets");
  //     appendElements([linebreak, removeBets]);
  //     removeBets.addEventListener("click", () => {
  //       bets = 0;
  //       block.children[1].textContent = `Your bet is: ${bets}`;
  //     });
  //   }
  appendElements([
    placeYourBet,
    linebreak,
    amountBet,
    linebreak,
    five,
    ten,
    twenty,
    fifty,
  ]);
}
