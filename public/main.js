const startbtn = document.querySelector("#startbtn");
const rockbtn = document.querySelector("#rock");
const paperbtn = document.querySelector("#paper");
const scissorbtn = document.querySelector("#scissor");
const allRps = document.querySelectorAll(".rps");

const block = document.querySelector("#content");

startbtn.addEventListener("click", () => {
  startbtn.classList.add("gameon");
  allRps.forEach((btn) => {
    btn.classList.remove("gameon");
  });
  // rockbtn.classList.remove("gameon");
  // paperbtn.classList.remove("gameon");
  // scissorbtn.classList.remove("gameon");
  block.children[2].textContent = "Choose:";
});

rockbtn.addEventListener("mouseover", () => {});
