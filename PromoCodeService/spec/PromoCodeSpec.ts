
import { response } from "express";
import "jasmine";
import { PromoCode } from "../src/entity/PromoCode";
import app,{server} from '../src/index';
var request = require("supertest");


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
            spyOn(PromoCode, "find").and.returnValues(new Promise<any>((resolve, _reject) => resolve(
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
            const {status, text} = await request(app).get("/promocode/getPromoCodes")
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
    describe("GET /promocode/updatePromoCode", function() {
        it("should return the sentence Pricing Service", async () => {
            spyOn(PromoCode, "findOne").and.returnValue(new Promise<any>((resolve, _reject) => resolve(
                {
                    idPromoCode: 1,
                    pricePoints: 10,
                    reductionRate: 0.2
                }
            )));
            const {status, text} = await request(app).get("/promocode/updatePromoCode", {
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
})

