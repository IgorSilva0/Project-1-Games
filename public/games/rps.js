const startbtn = document.querySelector("#startbtn");
const allRps = document.querySelectorAll(".rps");
const block = document.querySelector("#content");
let player = "";
let round = 1;

// When press PLAY button
startbtn.addEventListener("click", () => {
  btnaudio.volume = 0.5;
  btnaudio.play();
  setTimeout(() => {
    allRps.forEach((btn) => {
      btn.classList.remove("gameon");
    });
    startbtn.classList.add("gameon");
    block.children[1].textContent = `Round ${round}`; // h3
    block.children[2].classList.add("gameon"); // img
    block.children[3].textContent = "Choose:"; // h4
  }, "200");
});

// Listen to player Choice
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
    showChoice();
  });
});

// 3 2 1 GO
async function showChoice() {
  allRps.forEach((x) => x.classList.add("gameon"));
  // create a first new img and style it
  const handOne = document.createElement("img");
  handOne.src = "../imgs/123.png";
  handOne.classList.add("handOne");
  handOne.id = "handOne";
  // create a second new img and style it
  const handTwo = document.createElement("img");
  handTwo.src = "../imgs/321.png";
  handTwo.classList.add("handTwo");
  handTwo.id = "handTwo";
  // append both imgs to content
  block.appendChild(handOne);
  block.appendChild(handTwo);
  gameStart();
}

// Who wins?
async function gameStart() {
  const rps = ["rock", "paper", "scissors"];
  let random = Math.floor(Math.random() * 3);
  let pcChoice = rps[random];

  switch (pcChoice) {
    // Computer chose ROCK
    case "rock":
      if (player === "paper") {
        await updateScore();
        await rankData();
        console.log("You win! paper wins over rock");
        break;
      } else if (player === "rock") {
        console.log(`It's a Draw (rock and rock)`);
        break;
      } else {
        console.log(`Computer wins with rock`);
        break;
      }
    // Computer chose PAPER
    case "paper":
      if (player === "scissors") {
        await updateScore();
        await rankData();
        console.log("You win! scissors wins over paper");
        break;
      } else if (player === "paper") {
        console.log(`It's a Draw (paper and paper)`);
        break;
      } else {
        console.log(`Computer wins with paper`);
        break;
      }
    // Computer chose SCISSORS
    case "scissors":
      if (player === "rock") {
        await updateScore();
        await rankData();
        console.log("You win! rock wins over scissors");
        break;
      } else if (player === "scissors") {
        console.log(`It's a Draw (scissors and scissors)`);
        break;
      } else {
        console.log(`Computer wins with scissors`);
        break;
      }
    // Default
    default:
      console.log("ERROR");
      break;
  }
}

async function updateScore() {
  await fetch("http://localhost:5432/scorerps/1?k=8*ej1^3d9K:J4zn136", {
    method: "PUT",
  });
}
