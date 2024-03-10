const startbtn = document.querySelector("#startbtn");
const rockbtn = document.querySelector("#rock");
const paperbtn = document.querySelector("#paper");
const scissorbtn = document.querySelector("#scissor");

startbtn.addEventListener("click", () => {
  startbtn.classList.add("gameon");
  rockbtn.classList.remove("gameon");
  paperbtn.classList.remove("gameon");
  scissorbtn.classList.remove("gameon");
});
