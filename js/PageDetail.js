import { API_KEY } from "../key";
import { fetchAll } from "./fetch";
const home = document.querySelector("#app");
const details = document.querySelector("#detail");

export const PageDetail = (argument = "") => {
  home.style.display = "none";
  displayGamesDetail(argument);
};
//-------------------------------------------------------------fech link games------------------------------------------
function getApiLinkDetail(idGame) {
  return `https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`;
}
// --------------------------------------------------------------fech link games movie-----------------------------------
function getApiMovieGame(idGame) {
  return `https://api.rawg.io/api/games/${idGame}/movies?key=${API_KEY}`;
}
function getApiScreenGame(idGame) {
  return `https://api.rawg.io/api/games/${idGame}/screenshots?key=${API_KEY}`;
}

//------------------------------------------------------------fetch datas games---------------------------------------
async function getDetailGamesData(arg) {
  const GamesData = await fetchAll(getApiLinkDetail(arg));
  return GamesData;
}

async function getDetailGamesMovie(movid) {
  const MovieDataMovie = await fetchAll(getApiMovieGame(movid));

  return MovieDataMovie;
}
async function getCountScreenMovie(screen) {
  const ScreenDataMovie = await fetchAll(getApiScreenGame(screen));
  return ScreenDataMovie;
}

// ------------------------------------------------------------detail games-----------------------------------------------
async function displayGamesDetail(arg) {
  const GamesData = await getDetailGamesData(arg);
  const MovieDataMovie = await getDetailGamesMovie(GamesData.slug);
  const ScreenDataMovie = await getCountScreenMovie(GamesData.slug);
  const releasedDate = await getReleasedData(GamesData.released);
  const studioName = await nameInfo(GamesData.developers);
  const tagsName = await nameInfo(GamesData.tags);
  const genreGame = await nameInfo(GamesData.genres);
  const nameEditor = await nameInfo(GamesData.publishers);
  const platForm = await availablePlatformGame(GamesData.parent_platforms);
  const webSite = GamesData.website;
  const moviesGame = await getMovieGame(MovieDataMovie.results);
  const ratingGame = GamesData.rating;
  const numberRatings = GamesData.ratings.length;
  const countScreen = await getScreenCount(ScreenDataMovie.results);

  let content = "";
  content += `
  <div class="restru">

<img class="imgDetail" src="${GamesData.background_image}"></img></div>

 <div class="nameRatioDetail">
 <div class="nameDetail"><h3 >${GamesData.name}</h3></div>
<div class="ratioDetail"><h4 >ratio:${ratingGame}/5</h4></div>
</div> 


<div class ="gameDescription">
<div class="desciptionDetailGame"><h3>Description:</h3></div>
<div class="descriptionDetail"><p> ${GamesData.description}</p></div>
</div>

 <div class="detail">
  <div class="releasedDetail"><h3>Release Date</h3><div class=""> ${releasedDate}</div></div>
    <div class="editorDetail"><h3>Developer</h3><div class=""> ${nameEditor}</div>  </div>
      <div class="platFormDetail"><h3>Platforms</h3> <div class="">${platForm} </div>   </div>
       <div class="studioDetail"><h3>Publisher</h3><div class="">${studioName}</div> </div></div>
    


     <div class="genreTagDetail">

     <div class="genreDetail"><h3>Genre</h3><div class="">${genreGame} </div></div>
      <div class="tagsDetail"><h3>Tags</h3><div class=""> ${tagsName}</div></div>   
     </div> 
  
    
    <div class="noteNumber">nombre de note ${numberRatings}</div>  


    <div class="webSite">siteweb${webSite}   </div>  
   
    <div class="movie">${moviesGame}</div>

    <div class="globalScreen">
    <div class="screen"> ${countScreen}</div>  </div>  


  
 `;
  details.innerHTML = content;
}

// ---------------------------------------------------------------DATE RELEASED-----------------------------------------------------
async function getReleasedData(data) {
  if (data !== null) {
    return data;
  } else {
    return "Date non communiqué";
  }
}

// -----------------------------------------------------------FUNCTION UTILITARY(developer,tags,genre,publisher)-----------------------------------------------
function nameInfo(data) {
  return data.map((element) => element.name).join(", ");
}

//----------------------------------------------------------------------PLATFROM------------------------------------------------------------------
async function availablePlatformGame(data) {
  let content = "";
  data.forEach(async (element) => {
    content += `
    <object>${element.platform.name},</object>
    `;
  });
  return content;
}
//----------------------------------------------------------------------MOVIES GAME--------------------------------------------------------------

async function getMovieGame(mov) {
  let contentMovie = "";
  if (mov.length > 0) {
    contentMovie += `
    <video width="1000" height="500" controls>
  <source src="${mov[0].data.max}" type="video/mp4">
  </video>
   `;
    return contentMovie;
  } else {
    return "Video indisponible";
  }
}

//-----------------------------------------------------------------------count screen----------------------------------------
async function getScreenCount(co) {
  let contentScreen = "";
  for (let i = 0; i < 4; i++) {
    contentScreen += `
  
    <img  width="400" height="200" src="${co[i].image}"></img>`;
  }
  return contentScreen;
}
