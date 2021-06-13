import "reflect-metadata";
import { Request, json } from "express";
import { Server } from "http";
import {} from 'jasmine';
import { VehicleTracking } from "../src/entity/VehicleTracking";

import { stat } from "node:fs";



interface IData {
    status?: number;
    body?: string;
}

  
let request = require("request");

describe("Service test", () => {
    
    describe("GET /", () => {
        let data: IData = {};
        beforeAll((done) => {
          request.get(
            "http://localhost:8500",
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
          expect(data.body).toBe("This service is up and running !");
      });
    });

   
    describe("Test add tech Details ByLocation", () => {
      let data: IData = {};
      beforeAll((done) =>async()=> {
        const tracking=VehicleTracking.create({
            idPosition:7,
            latitude:36.078,
            longitude:3.8790
        })
        await tracking.save()

        const trackingUpdated = await VehicleTracking.findOneOrFail({
          idPosition:7,
        });
          request("http://localhost:8500")
            .post("/AddPosition")
            .send(tracking)
            .expect(tracking).toEqual(trackingUpdated)
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

