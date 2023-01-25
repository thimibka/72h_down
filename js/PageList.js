import { API_KEY } from "../key";

export const PageList = (argument = "") => {
// console.log("pageliste",argument);
};
function getAPIDescriptionHome(idGame){
   return `https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`;
}


