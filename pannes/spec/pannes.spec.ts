import "reflect-metadata";
import { Request, json } from "express";
import { Server } from "http";
import {} from 'jasmine';


interface IData {
    status?: number;
    body?: string;
}

  
let request = require("request");

describe("Pannes service test", () => {
    
    describe("GET /", () => {
        let data: IData = {};
        beforeAll((done) => {
          request.get(
            "http://localhost:8100",
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
        it("Body", () => {
          expect(data.body).toBe("Pannes service is up and running !");
      });
    });


    describe("GET /detect", () => {
        let data: IData = {};
        beforeAll((done) => {
            const state = {
              batteryCharge:13,
              fuelLevel:57,
              engineTemp:112.3, 
              brakeFuild:1,
              oilPressure:10,
              idVehicle:3
            };
            request("http://localhost:8100")
              .get("/detect")
              .send(state)
              .expect(200)
              .end((err: Error, res: any) => {
                if (err) {
                  console.log(err);
                }
                data.status = res.statusCode;
                done();
              });
            it("Status 200", () => {
              expect(data.status).toBe(200);
            });
      });
    });
});



