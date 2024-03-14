const mainBox = document.querySelector("#main");
const sideBar = document.querySelector("#ulSideBar");
const nightMode = document.querySelector("#nightMode");
const lightMode = document.querySelector("#lightMode");
const topNavBar = document.querySelector("#topNavBar");
const contentOne = document.querySelector("#content");
const contentTwo = document.querySelector("#content2");
const rank = document.querySelector("#rank");
const top1 = document.querySelector("#top1");
const top2 = document.querySelector("#top2");
const top3 = document.querySelector("#top3");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function displayRankData() {
  const data = await fetchData("/top3");
  if (!data) return;

  try {
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
  } catch (error) {
    console.error("Error displaying rank data:", error);
  }
}

displayRankData();
