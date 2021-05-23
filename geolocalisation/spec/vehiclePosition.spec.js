var request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../src/index.ts"); 
    });
    afterAll(() => {
        server.close();
    });
    describe("GET /", () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:8000/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
            it("Status 200", () => {
                expect(data.status).toBe(200);
            });
            it("Body", () => {
                expect(data.body).toBe("geolocation service is up and running!");
            });
        });
    });
    describe("GET /vehiclePosition", () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:8000/vehiclePosition", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
            it("Status 200", () => {
                expect(data.status).toBe(200);
            });
            it("Body", () => {
                expect(data.body).toBe("geolocation service is up and running!");
            });
        });
    });
});
