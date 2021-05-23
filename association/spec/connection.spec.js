const io = require("socket.io-client");
const axios = require("axios")

describe("vehicle connection", function() {

    beforeAll(function(done) {
        this.socket = io("http://127.0.0.1:8000/", {
            path: "/socket"
        });

        this.socket.on("connect_error", function() {
            fail("an error occured while connecting");
            done()
        })
        this.socket.on("connect", function() {
            done()
        })
    })

    afterAll(function() {
        this.socket.disconnect()
    })

    it("shouldn't connect with a wrong id type", function(done) {
        this.socket.emit("connected vehicule", {id: "hello"});

        this.socket.on("error", function(msg) {
            expect(msg).toEqual({ message: 'invalid input syntax for type integer: "hello"' })
            done()            
        })
    })

    it("should connect successfully", function (done) {
        this.socket.emit("connected vehicule", {id: 1});

        this.socket.on("connected", async function() {
            // see if it is returned by the corresponding endpoint
            let result = await axios.get("http://localhost:8000/vehicules");
            let connections = JSON.parse(result.data);

            expect(connections.id).toBe(1)
            done()
        })
    });
})