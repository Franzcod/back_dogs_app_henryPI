// const { Dog } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getAllDataAPI() {
  // Trae toda la data
  let allData = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  allData = allData.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      height_min: el.height.metric.split(" - ")[0],
      height_max: el.height.metric.split(" - ")[1],
      weight_min: el.weight.metric.split(" - ")[0],
      weight_max: el.weight.metric.split(" - ")[1],
      life_span: el.life_span,
      image: el.image.url,
      userCreate: false,
      temperaments: el.temperament,
    };
  });

  return allData;
}

async function getAllTemperament() {
  // devuelvo solo los temperamentos
  let allData = await getAllDataAPI();
  let temperamentList = allData.map((el) => {
    return el.temperaments;
  });

  let procesado = temperamentList
    .map((el) => {
      if (el == null) return "";

      return el.split(", ");
    })
    .flat();

  let res = procesado.sort();

  let temperamentSinRepetir = [];

  res.forEach((el) => {
    if (temperamentSinRepetir.indexOf(el) === -1) {
      temperamentSinRepetir.push(el);
    }
  });

  return temperamentSinRepetir;
}

module.exports = {
  getAllDataAPI,
  getAllTemperament,
};
