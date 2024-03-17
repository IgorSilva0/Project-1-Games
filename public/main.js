const allElements = document.querySelectorAll("*");
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
const linebreak = document.createElement("br");
const home = document.querySelector(".fa-house");
const gamesbtn = document.querySelector(".fa-gamepad");
const gallery = document.querySelector(".fa-image");
const bell = document.querySelector(".fa-bell");
const config = document.querySelector(".fa-gear");
const rStar = document.querySelector(".fa-ranking-star");

//// SIDE BAR BUTTONS
// HOME
home.addEventListener("click", () => {
  block.style.backgroundImage = "none";
  block.innerHTML = "";
});

// GAMES
gamesbtn.addEventListener("click", () => {
  block.style.backgroundImage = "none";
  block.innerHTML = "";
  const h1 = createEl("h1", "Games List");
  const game1 = createBtn("game1", "btnStyle", "Rock, Paper and Scissors");
  game1.style.marginBottom = "1rem";
  //RPS
  game1.addEventListener("click", async () => {
    block.innerHTML = "";
    await loading();
    loadRPS();
  });
  //BJ
  const game2 = createBtn("game2", "btnStyle", "Black Jack");
  game2.addEventListener("click", async () => {
    block.innerHTML = "";
    await loading();
    block.style.backgroundImage = "url(./imgs/table.jpg)";
    loadBlackJack();
  });
  appendElements([h1, game1, linebreak, game2]);
});

// GALLERY
gallery.addEventListener("click", () => {
  block.style.backgroundImage = "none";
  block.innerHTML = "";
});

// BELL
bell.addEventListener("click", () => {
  block.style.backgroundImage = "none";
  block.innerHTML = "";
});

// Config
config.addEventListener("click", () => {
  block.style.backgroundImage = "none";
  block.innerHTML = "";
});

// Rank
rStar.addEventListener("click", () => {
  block.style.backgroundImage = "none";
  block.innerHTML = "";
});

// Night mode
nightMode.addEventListener("click", () => {
  mainBox.style.backgroundColor = "rgb(29, 29, 29)";
  allElements.forEach((x) => (x.style.color = "white"));
});

// Light mode
lightMode.addEventListener("click", () => {
  mainBox.style.backgroundColor = "White";
  allElements.forEach((x) => (x.style.color = "white"));
});

function createEl(any, text, cls, id) {
  const el = document.createElement(`${any}`);
  if (text) {
    el.textContent = `${text}`;
  }
  if (cls) {
    el.classList.add(`${cls}`);
  }
  if (id) {
    el.id = `${id}`;
  }
  return el;
}

function createBtn(id, cls, text) {
  const crtBtn = document.createElement("button");
  if (id) {
    crtBtn.id = id;
  }
  if (cls) {
    crtBtn.classList.add(`${cls}`);
  }
  if (text) {
    crtBtn.textContent = `${text}`;
  }
  return crtBtn;
}

function createImage(src, cls, id) {
  const img = document.createElement("img");
  img.src = src;
  if (cls) {
    img.classList.add(cls);
  }
  if (id) {
    img.id = id;
  }
  return img;
}

function appendElements(elements) {
  elements.forEach((element) => block.appendChild(element));
}

function removeElements(elements) {
  elements.forEach((element) => element.remove());
}

async function loading() {
  const loadingDiv = createEl("div", "Loading", "ring");
  const loadingSpan = createEl("span", "", "loading");
  loadingDiv.appendChild(loadingSpan);
  appendElements([loadingDiv]);
  await delay(500);
  loadingDiv.remove();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// increase score + 1, atm in user id = 1
async function updateScore() {
  await fetch("/scorerps/1?k=8*ej1^3d9K:J4zn136", {
    method: "PUT",
  });
}
// Fetching a displaying data on RANK
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
// Fetching a displaying data on RANK
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
