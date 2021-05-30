import { createConnection, getConnection, InsertResult } from "typeorm";
import { User } from "../src/entity/Authentication";
import { checkJwt } from "../src/Middleware/checkJwt";
import { generateToken } from "../src/Middleware/generateToken";
const request = require("supertest");

describe("Service Test 🧪 : ", () => {
  describe("API Calls Test 📢", () => {
    it("Calls get method to retrieve all users ", (done) => {
      request("http://localhost:8000")
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((_err: Error, _res: Response) => {
          done();
        });
    });
    it("Calls create method for the user signin ", (done) => {
      request("http://localhost:8000")
        .post("/signin")
        .send({
          email: "test@esi.dz",
          password: "rootroot",
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((_err: Error, _res: Response) => {
          console.log(_res.text);
          expect(_res.text).toBeDefined();
          done();
        });
    });
    it("Calls create method for the user signup ", (done) => {
      request("http://localhost:8000")
        .post("/signup/")
        .send({
          email: "test@esi.dz",
          password: "rootroot",
          idUser: 5,
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((_err: Error, _res: Response) => {
          console.log(_res.text);
          expect(_res.text).toBeDefined();
          request("http://localhost:8000").delete("/4").expect(204).end();
          done();
        });
    });
    it("Calls update method for a user", (done) => {
      request("http://localhost:8000")
        .put("/5")
        .send({
          email: "hz_khedri@esi.dz",
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((_err: Error, _res: Response) => {
          console.log(_res.text);
          expect(_res.text).toBeDefined();
          done();
        });
    });
  });
});
