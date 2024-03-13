const mainbox = document.querySelector("#main");
const sideBar = document.querySelector("#ulSideBar");
const nigth = document.querySelector("#nightMode");
const day = document.querySelector("#lightMode");
const topBar = document.querySelector("#topNavBar");
const contentOne = document.querySelector("#content");
const contentTwo = document.querySelector("#content2");
const rank = document.querySelector("#rank");
const top1 = document.querySelector("#top1");
const top2 = document.querySelector("#top2");
const top3 = document.querySelector("#top3");
const btnaudio = new Audio("./sound/button.mp3");
const rankData = async () => {
  await displayScore();
};

async function displayScore() {
  const response = await fetch("http://localhost:5432/top3");
  const data = await response
    .json()
    .then((data) => {
      // TOP 1
      top1.textContent = ` ${data.payload[0].score}`;
      top1.previousElementSibling.textContent = `${data.payload[0].name}`;
      top1.previousElementSibling.previousElementSibling.src = `${data.payload[0].img}`;
      // TOP 2
      top2.textContent = ` ${data.payload[1].score}`;
      top2.previousElementSibling.textContent = `${data.payload[1].name}`;
      top2.previousElementSibling.previousElementSibling.src = `${data.payload[1].img}`;

      // TOP 3
      top3.textContent = ` ${data.payload[2].score}`;
      top3.previousElementSibling.textContent = `${data.payload[2].name}`;
      top3.previousElementSibling.previousElementSibling.src = `${data.payload[2].img}`;
    })
    .catch((error) => {
      console.log(error);
    });
}

rankData();
