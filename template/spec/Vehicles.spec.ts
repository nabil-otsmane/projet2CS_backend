import { createConnection, getConnection, InsertResult } from "typeorm";
import "reflect-metadata";
import { Vehicle } from "../src/entity/Vehicle";
import VehicleController = require('../src/controllers/VehicleController')
import { Request, json } from "express";
import "express"
import { Server } from "http";

import "jasmine"
import "jasmine-spec-reporter"
import "jasmine-ts"

const endpoint = "http://54.37.87.85:5000/"
//const request = require("supertest");
const request = require('request');
interface IData {
  status?: number;
  body?: string;
}

describe("Service Test : ", () => {

  /* describe("GET /", () => {
     let data: IData = {};
     beforeAll((done) => {
         
       request.get(
         "http://localhost:8083",
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
   });*/

  describe("GET /vehiclelist", () => {
    let data: IData = {};
    beforeAll((done) => {
      request.get(
        endpoint + "pricing/vehiclesList",
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


  describe("GET /vehicleByid", () => {
    let data: IData = {};
    beforeAll((done) => {
      request.get(
        endpoint + "pricing/vehicle/3",
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

  describe("GET /vehicleByid", () => {
    let data: IData = {};
    beforeAll((done) => {
      request.get(
        endpoint + "pricing/vehiclesListByState/available",
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
/*describe('city', function () {
  it('should return 200 response code', function (done) {
      request.get("http://localhost:8083/pricing/vehicle/3", function (_error: any, response: any, body: any) {
          expect(response.statusCode).toEqual(200);
          done();
      });
  });


});*/