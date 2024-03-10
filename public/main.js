const startbtn = document.querySelector("#startbtn");
const allRps = document.querySelectorAll(".rps");
const block = document.querySelector("#content");
let gameStart = false;

startbtn.addEventListener("click", () => {
  allRps.forEach((btn) => {
    btn.classList.remove("gameon");
  });
  startbtn.classList.add("gameon");
  block.children[2].textContent = "Choose:";
  gameStart = true;
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
    console.log(`hi${z.target.src}`);
  });
});
