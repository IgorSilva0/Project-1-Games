const startbtn = document.querySelector("#startbtn");
const allRps = document.querySelectorAll(".rps");
const block = document.querySelector("#content");
let player = "";

startbtn.addEventListener("click", () => {
  allRps.forEach((btn) => {
    btn.classList.remove("gameon");
  });
  startbtn.classList.add("gameon");
  block.children[2].textContent = "Choose:";
});

allRps.forEach((x) => {
  x.addEventListener("mouseover", (z) => {
    z.target.src =
      z.target.src.slice(0, z.target.src.length - 4) + "2" + ".png";
  });
  x.addEventListener("mouseout", (z) => {
    z.target.src = z.target.src.slice(0, z.target.src.length - 5) + ".png";
  });
  x.addEventListener("click", (z) => {
    player = z.target.id;
    gameStart();
  });
});

function gameStart() {
  const rps = ["rock", "paper", "scissors"];
  let random = Math.floor(Math.random() * 3);
  let pcChoice = rps[random];

  switch (pcChoice) {
    // Computer chose ROCK
    case "rock":
      if (player === "paper") {
        console.log("You win! paper wins over rock");
      } else if (player === "rock") {
        console.log(`It's a Draw (rock and rock)`);
      } else {
        console.log(`Computer wins with rock`);
      }
      break;
    // Computer chose PAPER
    case "paper":
      if (player === "scissors") {
        console.log("You win! scissors wins over paper");
      } else if (player === "paper") {
        console.log(`It's a Draw (paper and paper)`);
      } else {
        console.log(`Computer wins with paper`);
      }
      break;
    // Computer chose SCISSORS
    case "scissors":
      if (player === "rock") {
        console.log("You win! rock wins over scissors");
      } else if (player === "scissors") {
        console.log(`It's a Draw (scissors and scissors)`);
      } else {
        console.log(`Computer wins with scissors`);
      }
      break;
    // Default
    default:
      console.log("ERROR");
      break;
  }
}
