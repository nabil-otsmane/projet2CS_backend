
import "jasmine";
import app, {server} from './index';
import PricingController = require('./controllers/PricingController');


describe("Pricing Test Suite", function() {    
    describe("test difference in hours", function() {
        it("should return 0 hours", function() {
            expect(PricingController.getDifferenceInHours(
                new Date('2021-03-04'),new Date('2021-03-04'))).toEqual(0);
        }); 
    })
    describe("test difference in hours", function() {
        it("should return 6 hours", function() {
            expect(PricingController.getDifferenceInHours(
                new Date(2021,3,4,14),new Date(2021,3,4,20))).toEqual(6);
        }); 
    })
    describe("test difference in hours", function() {
        it("should return 30 hours", function() {
            expect(PricingController.getDifferenceInHours(
                new Date(2021,3,4,14),new Date(2021,3,5,20))).toEqual(30);
        }); 
    })
    describe("test price from unit price and duration", function() {
        it("should return 6000", function() {
            expect(PricingController.calculateBasePrice(3000,3)).toEqual(6000);
        }); 
    })
    describe("test price from unit price and duration", function() {
        it("should return 1000", function() {
            expect(PricingController.calculateBasePrice(1000,1)).toEqual(1000);
        }); 
    })
    describe("test price from unit price and duration", function() {
        it("should return -1", function() {
            expect(PricingController.calculateBasePrice(1000,1)).toEqual(-1);
        }); 
    })
})

