
import { response } from "express";
import "jasmine";
import { PromoCode } from "../src/entity/PromoCode";
import app,{server} from '../src/index';
var request = require("supertest");


const promo = {
    idPromoCode: 1,
    pricePoints: 10,
    reductionRate: 0.2
}

describe("server", ()=>{  
    describe("GET /promocode", function() {
        it("should return the sentence Pricing Service", async () => {
            const {status, text} = await request(app).get("/promocode")
            expect(status).toEqual(200)
            expect(text).toEqual("Promotion Codes Service")
        }); 
    });
    describe("GET /promocode/getPromos", function() {
        it("should return the sentence Pricing Service", async () => {
            spyOn(PromoCode, "find").and.returnValues(
                new Promise<any>((resolve, _reject) => resolve(
                [
                    {
                        idPromoCode: 1,
                        pricePoints: 10,
                        reductionRate: 0.2
                    },
                    {
                        idPromoCode: 2,
                        pricePoints: 20,
                        reductionRate: 0.4
                    }
                ]
            )));
            const {status, text} = 
                    await request(app).get("/promocode/getPromoCodes")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify({
                promoCodes : [
                    {
                        idPromoCode: 1,
                        pricePoints: 10,
                        reductionRate: 0.2
                    },
                    {
                        idPromoCode: 2,
                        pricePoints: 20,
                        reductionRate: 0.4
                    }
                ]
            }))
        }); 
    })

    describe("POST /promocode/addPromoCode", function() {
        it("should return the sentence Pricing Service", async () => {
            spyOn(PromoCode, "findOne").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(promo)));
            spyOn(PromoCode, "create").and.returnValue(
                await new Promise<any>((resolve, _reject) => resolve(promo)));
            spyOn(PromoCode, "save").and.returnValue(
                new Promise<any>((resolve, _reject) => resolve(promo)));
            const {status, text} = await request(app).post("/promocode/addPromoCode", promo)
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify({
                msg : "success"
            }))
        }); 
    })

    describe("POST /promocode/updatePromoCode", function() {
        it("should a success message", async () => {
            spyOn(PromoCode, "findOne").and.returnValue(new Promise<any>((resolve, _reject) => resolve(promo)));
            spyOn(PromoCode, "save").and.returnValue(new Promise<any>((resolve, _reject) => resolve(promo)));
            const {status, text} = await request(app).post("/promocode/updatePromoCode").send({
                idPromoCode: 1,
                pricePoints : 15,
                reductionRate:null
            })
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify({
                msg : "success",
                promoCode :
                    {
                        idPromoCode: 1,
                        pricePoints: 15,
                        reductionRate: 0.2
                    }
            }))
        }); 
    })

    describe("POST /promocode/deletePromoCode/:idPromoCode", function() {
        it("should return a success message", async () => {
            spyOn(PromoCode, "delete").and.returnValue(new Promise<any>((resolve, _reject) => resolve(
                {
                    idPromoCode: 1,
                    pricePoints: 10,
                    reductionRate: 0.2
                }
            )));
            const {status, text} = await request(app).post("/promocode/deletePromoCode/1")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify({
                msg : "success"
            }))
        }); 
    })
})

