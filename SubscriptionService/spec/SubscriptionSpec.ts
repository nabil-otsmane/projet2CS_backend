
import "jasmine";
import { Subscription } from "../src/entity/Subscription";
import { SubscriptionType } from "../src/entity/SubscriptionType";
import { Tenant } from "../src/entity/Tenant";
import app, {server} from '../src/index';
var request = require("supertest");


describe("Testing Subscription Service", () => {    
    describe("GET none existing URL /", function() {
        it("should return error 404", async () => {
            const {status} = await request(app).get("/")
            expect(status).toEqual(404)
        }); 
    })
    describe("GET /subscription/", function() {
        it("should return the sentence Subscription Service", async () => {
            const {status, text} = await request(app).get("/subscription")
            expect(status).toEqual(200)
            expect(text).toEqual("Subscription Service")
        }); 
    })
})





