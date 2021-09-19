const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  xdescribe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name, weight_min and weight_max", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Dog.create({ name: "Pug" });
      });
      // ///////////// ///////////// ///////////// ///////////// ///////////// ///////////// ///////////
      it("should throw an error if weight min is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a weight min")))
          .catch(() => done());
      });

      it("should work when its a valid weight min", () => {
        Dog.create({ weight_min: "23" });
      });

      it("should throw an error if weight_max is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a weight_max")))
          .catch(() => done());
      });

      it("should work when its a valid weight_max", () => {
        Dog.create({ weight_max: "23" });
      });
    });
  });
});
