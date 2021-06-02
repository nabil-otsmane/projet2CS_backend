
import "jasmine";
import { Subscription } from "../src/entity/Subscription";
import { SubscriptionType } from "../src/entity/SubscriptionType";
import { Tenant } from "../src/entity/Tenant";
import app, {server} from '../src/index';
var request = require("supertest");

const tenant = {
    idTenant: 1,
    accountState:'Activated',
    subCard: 3
}
const tenant2 ={
    idTenant: 1,
    accountState:'Activated',
    subCard: null
}
const subType1 = {
    idSubType: 1,
    subTypeName: '1 mois',
    subTypeDuration: 30,
    reductionRate: 0.3,
    bonusPointsRate: 0.1
}
const subType2 = {
    idSubType: 2,
    subTypeName: '3 mois',
    subTypeDuration: 40,
    reductionRate: 0.5,
    bonusPointsRate: 0.25
}
const subscript = {
    subType: 1,
    creationDate: new Date("2021-05-30T00:35:20.459Z"),
    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
    subState: "pending",
    idSub: 3
}
const subscript2 = {
    subType: 1,
    creationDate: new Date("2021-05-30T00:35:20.459Z"),
    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
    subState: "active",
    idSub: 3
}
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
    describe("GET /subscription/hasSubscription", function() {
        it("should return true", async () => {
            spyOn(Tenant, "findOne").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(
                {
                    idTenant: 1,
                    accountState:'Activated',
                    subCard: 3
                }
            )));
            const {status, text} = 
                await request(app).get("/subscription/hasSubscription/1")
            expect(status).toEqual(200)
            expect(text).toEqual('true')
        }); 
    })
    describe("GET /subscription/hasSubscription", function() {
        it("should return false", async () => {
            spyOn(Tenant, "findOne").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(tenant2)));
            const {status, text} = 
                await request(app).get("/subscription/hasSubscription/1")
            expect(status).toEqual(200)
            expect(text).toEqual('false')
        }); 
    })
    describe("GET /subscription/getSubTypes", function() {
        it("should return list of subscriptions", async () => {
            spyOn(SubscriptionType, "find").and.returnValues(
                new Promise<any>((resolve, _reject) => resolve([
                    subType1,
                    subType2
                ]
                
            )));
            const {status, text} = 
                await request(app).get("/subscription/getSubTypes")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify([
                {
                    idSubType: 1,
                    subTypeName: '1 mois',
                    subTypeDuration: 30,
                    reductionRate: 0.3,
                    bonusPointsRate: 0.1
                },
                {
                    idSubType: 2,
                    subTypeName: '3 mois',
                    subTypeDuration: 40,
                    reductionRate: 0.5,
                    bonusPointsRate: 0.25
                }
            ]))
        }); 
    })

    describe("POST /subscription/addSub", function() {
        it("should return the inserted object ", async () => {
            spyOn(SubscriptionType, "findOne").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(subType1)));
            spyOn(Subscription, "create").and.returnValue(
               await new Promise<any>((resolve, _reject) => resolve({
                    subType: 1,
                    creationDate: new Date("2021-05-30T00:35:20.459Z"),
                    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
                    subState: "pending",
                }
            )));
            spyOn(Tenant, "findOne").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(tenant2)));
            spyOn(Subscription, "save").and.returnValue(
                await new Promise<any>((resolve, _reject) => resolve(subscript)));
            spyOn(Tenant, "save").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(tenant)));
            const {status, text} = 
                await request(app).post("/subscription/addSub",{
                    idTenant:1,
                    idSubType:3
                })
            expect(status).toEqual(201)
            expect(text).toEqual(JSON.stringify(
                {
                    subType: 1,
                    creationDate: new Date("2021-05-30T00:35:20.459Z"),
                    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
                    subState: "pending",
                    idSub: 3
                }
            ))
        }); 
    })
    describe("POST /subscription/activateSub", function() {
        it("should return a success message", async () => {
            spyOn(Subscription, "findOne").and.returnValue(
               await new Promise<any>((resolve, _reject) => resolve({
                    subType: 1,
                    creationDate: new Date("2021-05-30T00:35:20.459Z"),
                    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
                    subState: "pending",
                    idSub:3
                }
            )));
            spyOn(Subscription, "save").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(subscript2)));
            const {status, text} = 
                await request(app).post("/subscription/activateSub/1")
            expect(status).toEqual(201)
            expect(text).toEqual(JSON.stringify(
                {
                    msg : "success"
                }
            ))
        }); 
    })
    describe("GET /subscription/getSubByTenant", function() {
        it("should return the tenants Subscription", async () => {
            spyOn(Tenant, "findOne").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(tenant)));
            spyOn(Subscription, "findOne").and.returnValue(
               await new Promise<any>((resolve, _reject) => 
                            resolve(subscript2)));
            const {status, text} = 
            await request(app).get("/subscription/getSubByTenant/1")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify({
                sub : {
                    subType: 1,
                    creationDate: new Date("2021-05-30T00:35:20.459Z"),
                    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
                    subState: "active",
                    idSub: 3
                },
                msg: "success"
            }))
        }); 
    })

    describe("GET /subscription/getSubCards", function() {
        it("should return list of SubCards", async () => {
            spyOn(Subscription, "find").and.returnValues(
               await new Promise<any>((resolve, _reject) => 
                            resolve([subscript2])));
            const {status, text} = 
            await request(app).get("/subscription/getSubCards")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify({
                subs : [{
                    subType: 1,
                    creationDate: new Date("2021-05-30T00:35:20.459Z"),
                    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
                    subState: "active",
                    idSub: 3
                }]
            }))
        }); 
    })
    describe("POST /subscription/deleteExpiredSubs", function() {
        it("should return it should not delete the card", async () => {
            spyOn(Subscription, "find").and.returnValues(
                await new Promise<any>((resolve, _reject) => 
                            resolve([subscript2])));      
            const {status, text} = 
                await request(app).post("/subscription/deleteExpiredSubs")
            expect(status).toEqual(201)
            expect(text).toEqual(JSON.stringify({
                msg: "operation successful! 0 have been deleted."
            }))
        }); 
    })
    describe("POST /subscription/deleteExpiredSubs", function() {
        it("should return delete the card because it expired", async () => {
            subscript2.expirationDate = new Date("2021-05-29T00:35:20.459Z")
            spyOn(Subscription, "find").and.returnValues(
                await new Promise<any>((resolve, _reject) => 
                            resolve([subscript2])));
            spyOn(Tenant, "findOne").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(tenant)));    
            spyOn(Tenant, "save").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(tenant)));  
            spyOn(Subscription, "save").and.returnValues(
                await new Promise<any>((resolve, _reject) => 
                                resolve(subscript2)));       
            const {status, text} = 
                await request(app).post("/subscription/deleteExpiredSubs")
            expect(status).toEqual(201)
            expect(text).toEqual(JSON.stringify({
                msg: "operation successful! 1 have been deleted."
            }))
        }); 
    })
})





