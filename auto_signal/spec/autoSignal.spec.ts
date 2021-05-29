import "reflect-metadata";
import { Request, json } from "express";
import { Server } from "http";

interface IData {
  status?: number;
  body?: string;
}

let Request = require("request");
describe("Service Test : ", () => {
  
  describe("GET /", () => {
    let data: IData = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8002",
        (_error: any, response: any, body: any) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
      console.log(data);
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });
 
  describe("POST /estRemorquer", () => {
    let data: IData = {};
    beforeAll((done) => {
      Request.post(
        "http://localhost:8002/estRemorquee?remorque=true&idVehicle=3",
        (_error: any, response: any, body: any) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        }
      );
      console.log(data);
    });
    
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });

  

   describe("POST /dateDepassee", () => {
    let data: IData = {};
    beforeAll((done) => {
      Request.post(
        "http://localhost:8002/dateDepassee?idVehicle=3",
        (_error: any, response: any, body: any) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        }
      );
      console.log(data);
    });
    
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });
});
