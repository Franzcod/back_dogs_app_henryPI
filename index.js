//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
var colors = require("colors");
const services = require("../api/src/services/services_API.js");
const { Temperament } = require("../api/src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  console.log(" Base de datos conectada ".bgYellow.black);
  // SE PRECARGAN LOS TEMPERAMENTOS EN BASE DE DATOS (DESDE LA API)
  console.log(" Precargando Temperamentos de API en DB... ".black.bgYellow);
  let temperamentForAPI = await services.getAllTemperament();
  // se crea objeto para usar bulkCreate
  var objTemperamentos = temperamentForAPI
    .map((e) => {
      return {
        name: e,
      };
    })
    .filter((e) => e.name);
  //Se guardan en BD todos los temperamentos
  await Temperament.bulkCreate(objTemperamentos); //recibe un arreglo con objetos y asigna a mi tabla segun la propiedad el valor

  server.listen(3001, () => {
    console.log(" Server in port   > 3001 ".black.bgMagenta); // eslint-disable-line no-console
  });
});
