/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Temperament, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Prueba_de_TEST",
  height_min: "1",
  height_max: "2",
  weight_min: "3",
  weight_max: "4",
  life_span: "5",
  image: "https://accentsconagua.com/img/images_15/testing-in-nodejs_7.png",
};

xdescribe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  let ID = "";
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/api/dogs").expect(200));
    it("should get 200 (buscando por query una raza(akita))", () =>
      agent.get("/api/dogs?name=akita").expect(200));
    it("should get 200 (buscando por query una raza)", () =>
      agent.get("/api/dogs?name=Prueba_de_TEST").then((res) => {
        ID = res.body[0].id;
        console.log(ID);
        expect(res.body[0].name).to.be.equals("Prueba_de_TEST");
      }));
    it("should get 200 (buscando por ID)", () =>
      agent.get("/api/dogs/32").expect(200));
    it("should get 200 (buscando por ID NO EXISTENTE)", () =>
      agent.get("/api/dogs/3200").expect(404));
    it("should get 404", () => agent.get("/api/dos").expect(404));
  });
  describe("POST /dogs", () => {
    it("Create a dog", () =>
      agent
        .post(`/api/dogs`)
        .send({
          name: "TEST",
          height_min: "1",
          height_max: "2",
          weight_min: "3",
          weight_max: "4",
          life_span: "5",
          temperaments: ["Capo"],
          image:
            "https://accentsconagua.com/img/images_15/testing-in-nodejs_7.png",
        })
        .then(() => {
          agent.get("api/dogs?name=TEST").expect(200);
        }));
  });
  describe("DELETE /dogs", () => {
    it("Delete for ID", () => agent.delete(`/api/dogs/${ID}`).expect(200));
  });
});
// d71ce71c-00ff-414c-8aad-7f4fb7c58080
