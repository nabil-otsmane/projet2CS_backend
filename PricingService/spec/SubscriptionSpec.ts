import { response } from "express";
import "jasmine";
import { RentalPenalty } from "../src/entity/RentalPenalty";
import { Penalty } from "../src/entity/Penalty";
import app,{server} from '../src/index';
import { Subscription } from "../src/entity/Subscription";

var request = require("supertest");


const subscriptType = {
    subType: 1,
    solde:30000.0,
    creationDate: new Date("2021-05-30T00:35:20.459Z"),
    expirationDate: new Date("2021-06-29T00:35:20.459Z"),
    subState: "active",
    idSub: 3,
    subTypeO: { 
        idSubType: 1,
        subTypeName: '1 mois',
        subTypeDuration: 30,
        reductionRate: 0.3,
        bonusPointsRate: 0.1
    }
}

describe("Testing subscription controller", () => { 
    describe("GET /pricing/getSubReducedPrice/:idSub/:basePrice", function() {
        it("should return the sentence Pricing Service", async () => {
            spyOn(Subscription, "findOne").and.returnValue(await 
                new Promise<any>((resolve, _reject) => resolve(subscriptType)));
            const {status, text} = await request(app).get("/pricing/getSubReducedPrice/1/30000")
            expect(status).toEqual(200)
            expect(text).toEqual(JSON.stringify(
                {
                    price:  21000,
                    msg: "success"
                }
            ))
        }); 
    })
})



