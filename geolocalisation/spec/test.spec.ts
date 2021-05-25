import "jasmine";
import app, { server } from '../src/index';
import request = require('supertest');
import { VehicleTracking } from "../src/entity/VehicleTracking";
import { VehiclePosition } from "../src/entity/VehiclePosition";

describe('Geolocation service', () => {

    describe("GET /", function() {
        it("returns status 200 and message", async () => {
            const { status, text } = await request(app).get("/");
            const expectedStatus = 200;
            const expectedText = "geolocation service is up and running!";
            expect(status).toEqual(expectedStatus);
            expect(text).toEqual(expectedText);
        });
    });

    describe("GET /vehicleLatestPosition", function() {
        it("returns status 200 and vehicle latest position", async () => {
            //mocks des valeurs de retour des fonctions de typeorm
            spyOn(VehiclePosition, "findOne")
                .and
                .returnValue(new Promise<any>((resolve, _reject) => resolve({
                    idPosition: 3,
                    idRental: 1
                })));
            spyOn(VehicleTracking, "findOne")
                .and
                .returnValue(new Promise<any>((resolve, _reject) => resolve({
                    longitude: 3.0588,
                    latitude: 36.7538
                })));
            const { status, text } = await request(app).get("/vehicleLatestPosition?idRental=1");
            const expectedStatus = 200;
            const expectedText = '{ "ok": true, "position": [3.0588, 36.7538] }';
            expect(status).toEqual(expectedStatus);
            expect(JSON.parse(text)).toEqual(JSON.parse(expectedText));
        });
    });

});
