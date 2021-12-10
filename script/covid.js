import { buildChart } from "./graph.js";

// const { default: axios } = require("axios");
// const asiaSet = new Set();
// const africaSet = new Set();
// const americasSet = new Set();
// const europeSet = new Set();
// const australiaSet = new Set();
// const asia = {
//   totalDeaths: 0,
//   totalConfirmed: 0,
//   totalRecovered: 0,
//   totalCritical: 0,
// };

// save the code contry as a key & the conteint as the value.
const conteintMap = new Map();

// save the total deaths, confirmed, recovered & critical casses for each conteint.
const conteintObj = {
  // conteint: [totalDeaths, totalConfirmed, totalCritical, totalRecovered].
  asia: [0, 0, 0, 0],
  africa: [0, 0, 0, 0],
  americas: [0, 0, 0, 0],
  europe: [0, 0, 0, 0],
  Oceania: [0, 0, 0, 0],
};

// get the API for all the conteints and the world covid data.
(async function getFetch() {
  const asiaData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/asia"
  );
  const africaData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/africa"
  );
  const americasData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/Americas"
  );
  const europeData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/europe"
  );
  const australiaData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/Oceania"
  );
  const worldData = axios.get("https://corona-api.com/countries");

  const results = await Promise.all([
    asiaData,
    africaData,
    americasData,
    europeData,
    australiaData,
    worldData,
  ]);

  addToHash(results[0].data, "asia");
  addToHash(results[1].data, "africa");
  addToHash(results[2].data, "americas");
  addToHash(results[3].data, "europe");
  addToHash(results[4].data, "Oceania");

  calcWorldData(results[5].data.data);
})();

// adding the code contry as a key & the conteint as the value for every contry.
function addToHash(resultsArray, contientNum) {
  for (let i = 0; i < resultsArray.length; i++) {
    conteintMap.set(resultsArray[i].cca2, contientNum);
  }
}

// calculate the total deaths, confirmed, recovered & critical casses for each conteint.
function calcWorldData(WorldDataArray) {
  for (let i = 0; i < WorldDataArray.length; i++) {
    const contName = conteintMap.get(`${WorldDataArray[i].code}`);
    if (contName) {
      conteintObj[`${contName}`][0] += WorldDataArray[i].latest_data.deaths;
      conteintObj[`${contName}`][1] += WorldDataArray[i].latest_data.confirmed;
      conteintObj[`${contName}`][2] += WorldDataArray[i].latest_data.critical;
      conteintObj[`${contName}`][3] += WorldDataArray[i].latest_data.recovered;
    }
  }
}
