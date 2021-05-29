import "jasmine";
import request = require('supertest');
import { createConnection, getConnection } from "typeorm";
import app from '../src/index';
import { VehiclePosition } from "../src/entity/VehiclePosition";
import { VehicleTracking } from "../src/entity/VehicleTracking";

describe("Geolocation service test", () => {
    
    beforeAll(() => {
        //CREATE IN-MEM DB CONNECTION
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true, 
            entities: [VehiclePosition, VehicleTracking],
            synchronize: true,
            logging: false,
        }).then(async (_conn) => {
            //SEED DB
            await VehiclePosition.insert({
                idPosition: 1,
                idRental: 1
            });
            await VehiclePosition.insert({
                idPosition: 2,
                idRental: 2
            });
            await VehicleTracking.insert({
                idTrack: 1,
                longitude: 0,
                latitude: 0,
                created_at: "2021-05-15T09:44:51.075Z",
                idPosition: 1
            });
            await VehicleTracking.insert({
                idTrack: 2,
                longitude: 1,
                latitude: 1,
                created_at: "2021-05-15T09:44:52.075Z",
                idPosition: 2
            });
            await VehicleTracking.insert({
                idTrack: 3,
                longitude: 2,
                latitude: 2,
                created_at: "2021-05-15T09:44:53.075Z",
                idPosition: 1
            });
        });
    });

    afterAll(() => {
        //CLOSE DB CONNECTION
        let conn = getConnection();
        return conn.close();
    });

    describe("GET /", function() {
        //TEST ROOT ENDPOINT
        it("returns status 200 and message", async () => {
            const { status, text } = await request(app).get("/");
            const expectedStatus = 200;
            const expectedText = "geolocation service is up and running!";
            expect(status).toEqual(expectedStatus);
            expect(text).toEqual(expectedText);
        });
    });

    describe("GET /vehiclePosition", function() {
        //TEST vehiclePosition ENDPOINT + DATA
        it("returns status 200 and vehicle latest position", async () => {
            const { status, text } = await request(app).get("/vehiclePosition?idRental=1");
            const expectedStatus = 200;
            const expectedText = '{ "ok": true, "route": ['+
                '{ "idTrack": 1, "longitude": 0, "latitude": 0, "created_at": "2021-05-15T09:44:51.075Z", "idPosition": 1 },'+
                '{ "idTrack": 3, "longitude": 2, "latitude": 2, "created_at": "2021-05-15T09:44:53.075Z", "idPosition": 1 }'+
            ']}';
            expect(status).toEqual(expectedStatus);
            expect(JSON.parse(text)).toEqual(JSON.parse(expectedText));
        });
    });

    describe("GET /vehicleLatestPosition", function() {
        //TEST vehicleLatestPosition ENDPOINT + DATA
        it("returns status 200 and vehicle latest position", async () => {
            const { status, text } = await request(app).get("/vehicleLatestPosition?idRental=1");
            const expectedStatus = 200;
            const expectedText = '{ "ok": true, "position": [2, 2] }';
            expect(status).toEqual(expectedStatus);
            expect(JSON.parse(text)).toEqual(JSON.parse(expectedText));
        });
    });

});