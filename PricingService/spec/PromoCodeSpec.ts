import { response } from "express";
import "jasmine";
import PromoCodeController = require('../src/controllers/PromoCodeController')
import app,{server} from '../src/index';
import { PromoCode } from "../src/entity/PromoCode";
import { Tenant } from "../src/entity/Tenant";

var request = require("supertest");

const tenant ={
    idTenant: 1,
    accountState:'Activated',
    points: 30
}

describe("Testing Promocode controller", () => {    

    describe("calculateReduction", function() {
        it("should return the sentence Pricing Service", async () => {
            expect(PromoCodeController.calculateReduction(4000,0.3)).toEqual(2800)
        });
    })

    describe("GET /pricing/getReductionPrice/:basePrice/:idPromoCode", function() {
        it("should return the sentence Pricing Service", async () => {
            spyOn(PromoCode, "findOne").and.returnValue( await 
                new Promise<any>((resolve, _reject) => resolve(
                    {
                        idPromoCode: 1,
                        pricePoints: 10,
                        reductionRate: 0.2
                    }
            )));
            const {status, text} = await request(app).get("/pricing/getReductionPrice/28000/1")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify(
                {
                    price:  22400,
                    msg: "success"
                }
            ))
        }); 
    })

    describe("GET /pricing/applyPromoCode/:idTenant/:idPromoCode", function() {
        it("should return the sentence Pricing Service", async () => {
            spyOn(PromoCode, "findOne").and.returnValue( await 
                new Promise<any>((resolve, _reject) => resolve(
                    {
                        idPromoCode: 1,
                        pricePoints: 10,
                        reductionRate: 0.2
                    }
            )));
            spyOn(Tenant, "findOne").and.returnValue( await 
                new Promise<any>((resolve, _reject) => resolve(tenant)));
            spyOn(Tenant, "save").and.returnValue( await 
                new Promise<any>((resolve, _reject) => resolve(tenant)));
            const {status, text} = await request(app).get("/pricing/applyPromoCode/1/1")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify(
                {
                    idTenant: 1,
                    accountState:'Activated',
                    points: 20
                }
            ))
        }); 
    })
    
})



