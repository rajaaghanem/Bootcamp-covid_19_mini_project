// const { default: axios } = require("axios");

const asiaSet = new Set();
const africaSet = new Set();
const americasSet = new Set();
const europeSet = new Set();
const australiaSet = new Set();

const contienMap = new Map();

const conteintObj = {
  // [totalD: 0, totalCo:0, totalCri:0, totalRecovered:0]
  asia: [0, 0, 0, 0],
  africa: [0, 0, 0, 0],
  americas: [0, 0, 0, 0],
  europe: [0, 0, 0, 0],
  Oceania: [0, 0, 0, 0],
};

const asia = {
  totalDeaths: 0,
  totalConfirmed: 0,
  totalRecovered: 0,
  totalCritical: 0,
};

const notExistContry = [];

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

function addToHash(resultsArray, contientNum) {
  for (let i = 0; i < resultsArray.length; i++) {
    contienMap.set(resultsArray[i].cca2, contientNum);
  }
}

function calcWorldData(WorldDataArray) {
  for (let i = 0; i < WorldDataArray.length; i++) {
    const contName = contienMap.get(`${WorldDataArray[i].code}`);
    if (contName) {
      conteintObj[`${contName}`][0] += WorldDataArray[i].latest_data.deaths;
      conteintObj[`${contName}`][1] += WorldDataArray[i].latest_data.confirmed;
      conteintObj[`${contName}`][2] += WorldDataArray[i].latest_data.critical;
      conteintObj[`${contName}`][3] += WorldDataArray[i].latest_data.recovered;
    }
  }
  //   console.log(conteintObj);
}
