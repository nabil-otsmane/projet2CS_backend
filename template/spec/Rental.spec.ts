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



  describe("GET /rentalslist", () => {
    let data: IData = {};
    beforeAll((done) => {
      request.get(
        endpoint + "pricing/rentalsList",
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








  describe("GET /rentalByid", () => {
    let data: IData = {};
    beforeAll((done) => {
      request.get(
        endpoint + "pricing/rental/1",
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


  describe("GET /add rental", () => {
    let data: IData = {};
    beforeAll((done) => {
      request.post(endpoint + "pricing/addRental", {
        json: true, body:
        {
          "idTenant": 24,
          "idVehicle": 3,
          "rentaldate": "2021-02-02T23:00:00.000Z",
          "rentaltime": "10:30",
          "plannedrestitutiondate": "2021-02-04T23:00:00.000Z",
          "plannedrestitutiontime": "11:00",
          "restitutionDate": "2023-02-04T23:00:00.000Z",
          "restitutionTime": "11:00",
          "rentalType": "jour",
          "iddepartborne": 1,
          "iddestborne": 1,
          "rentalstate": "active"

        }
      }, (_error: any, response: any) => {
        data.status = response.statusCode;
        // data.body = JSON.parse(body);
        done();
      });
      console.log(data);
    });

    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });

});
