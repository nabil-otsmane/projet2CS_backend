import { createConnection, getConnection, InsertResult } from "typeorm";
import "reflect-metadata";
import { Request, json } from "express";
import { Server } from "http";
const request = require("supertest");

interface IData {
  status?: number;
  body?: string;
}

describe("Service Test : ", () => {
  
  describe("GET /", () => {
    let data: IData = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8001",
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
 
  describe("GET /vehicle_state", () => {
    let data: IData = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8001/vehicle_state?idVehicle=3",
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
   describe("GET /rental_info", () => {
    let data: IData = {};
    beforeAll((done) => {
      Request.get(
        "http://localhost:8001/rental_info?idVehicle=3",
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

