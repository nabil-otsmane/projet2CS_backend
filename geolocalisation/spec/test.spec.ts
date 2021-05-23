import "jasmine";
import app, { server } from '../src/index';
import request = require('supertest');

describe('Get all users request', () => {
    /*afterAll(() => {
        server.close();  //for the moment this doesn't work idk why but the server closes on its own anyway so...
    });*/

    describe("GET /", function() {
        it("returns ???", async () => {
            const { status, text } = await request(app).get("/");
            const expectedResponseBody = "geolocation service is up and running!";
            const expectedResponseStatusCode = 200;
            expect(status).toEqual(expectedResponseStatusCode);
            expect(text).toEqual(expectedResponseBody);
        });
    });
});




//in-memory database to test for later, maybe mock request will call this db instead

/*
import { newDb } from 'pg-mem';

let db = newDb();

const query = 
`CREATE TABLE VehiclePosition
(
    idPosition integer,
    idRental integer
);
INSERT INTO VehiclePosition
	VALUES (1, 1);
CREATE TABLE VehicleTracking
(
    idTrack integer,
    latitude double precision,
    longitude double precision,
    created_at timestamp,
    idPosition integer
);
INSERT INTO VehicleTracking
    VALUES (1, -122.483696, 37.833818, now(), 1);
INSERT INTO VehicleTracking
    VALUES (2, -122.483589, 37.833496, now(), 1);`;

db.public.none(query);
*/
