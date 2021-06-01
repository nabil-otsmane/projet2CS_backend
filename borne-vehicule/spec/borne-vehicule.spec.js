var Request = require("request");

describe("GET /vehicule", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8100/vehicules/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /vehicules", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8200/vehicules", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /vehicules", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8200/vehicules",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                unitpriceperhour: "unitpriceperhourTest",
                unitpriceperday: "unitpriceperdayTest",
                vehiculetype: "vehiculetypeTest",
                vehiculebrand: "vehiculebrandTest",
                vehiclemodel: "vehiclemodelTest",
                availability: "availability",
                image: "image"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});


describe("GET /borne", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8200/bornes/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /bornes", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8200/bornes", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /bornes", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8200/bornes",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                city: "cityTest"
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});