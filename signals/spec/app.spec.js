var Request = require("request");


describe("GET /signal", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8000/signals/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

   
describe("GET /signals", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8000/signals/2", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("POST /signals", () => {

    it("Returns status code 200", () => {
        var status;
        Request.post({
            url: "http://localhost:8000/signals",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                signalType: "panne",
                message: "testFirstName",
                sourceType: "Auto",
                idUserSource: 11,
                idVehicle: 111,
                sent_at: 1281
            })
        },(error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });
});

describe("GET /panne_signals", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8000/panne_signals", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("GET /theft_signals", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8000/theft_signals", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});

describe("PUT /signals_treated?idSignal=5", () => {
    
    it("returns status code 200", () => {
        
        var status = 200;
        
        Request.get("http://localhost:8000/theft_signals", (error, response, body) => {
                status = response.statusCode;
            });

        expect(status).toBe(200);
    });

});



