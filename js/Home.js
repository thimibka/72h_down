import { API_KEY } from "../key";
import { fetchAll } from "./fetch";
const app = document.querySelector("#app");
const showMore = document.querySelector("#showMore");
let numberPages = 9;

export const Home = (argument = "") => {
  displayHomeGamesData("", numberPages);
  showMore.addEventListener("click", () => {
    if (numberPages < 27) {
      displayHomeGamesData(argument, (numberPages += 9));
    }
  });
};

function getAPILinkHome(value, size) {
  let url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31.2023-02-01,2023-12-31&page_size=${size}`;
  if (value) {
    url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}`;
  }
  return url;
}

async function getHomeGamesData(searchValue, size) {
  const GamesData = await fetchAll(getAPILinkHome(searchValue, size));
  return GamesData;
}

async function displayHomeGamesData(searchValue, size) {
  const GamesData = await getHomeGamesData(searchValue, size);
  let content = "";
  GamesData.results.forEach(async (element) => {
    const platform = await getGamePlatform(element.parent_platforms);
    content += `

  <div class="grid-item">
    
  <img src="${element.background_image}" class="thumbnail-home"><div class="">${element.name}</div>
       <div class="">${platform}</div>
       <a href="#pagedetail/${element.slug}">En savoir plus</a>
   

   </div>
    `;
    app.innerHTML = content;
  });
}

async function getGamePlatform(data) {
  let content = "";
  const platform = {
    playstation: ` src="../logo/ps4.svg"`,
    xbox: `src="../logo/xbox.svg"`,
    nintendo: `src="../logo/switch.svg"`,
    pc: `scr="../logo/windows.svg"`,
    ios: `src="../logo/mobile.svg"`,
  };

  data.forEach(async (element) => {
    content += `
    <img class="icon" ${platform[element.platform.slug]}></img>`;
  });
  return content;
}


const moninput = document.getElementById("choice");
moninput.addEventListener("keyup", async (event) => {
  displayHomeGamesData(event.target.value, numberPages);
});
