const { Router } = require("express");
const { Temperament } = require("../db");
// const services = require("../services/services_API");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res, next) => {
  //Devuelve todos los temperamentoos de la base d datos
  // Precargados cuando se inicia la base de datos

  try {
    let temperament = await Temperament.findAll();
    temperament = temperament.map((el) => {
      return el;
    });

    console.log(" Temperamentos traidos de BD ".black.bgBlue);
    res.json(temperament);
  } catch (error) {
    next("Rompio el get Temperament >  ".bgRed, error);
  }
});

// router.post("/", async (req, res, next) => {
//   const { name } = req.body;
//   try {
//     const newTemperament = await Temperament.create({
//       name,
//     });
//     console.log(" Temperamentos nuevo guardado ".black.bgBlue);
//     res.json(newTemperament);
//   } catch (error) {
//     next("Rompio el POST Temperament: ".red, error);
//   }
// });

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  console.log("1,: ", res);
  const newTemperament = Temperament.create({
    name,
  })
    .then((resp) => {
      // console.log(res);
      return res.send(resp);
      // return res.json;
    })
    .catch((error) => console.log(error));
});

module.exports = router;
