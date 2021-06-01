import MeasureDistance from '../src/lib/measurement'

describe("distance measurement", function () {
    it("calculates distance between two coords", function () {
        expect(MeasureDistance(1.021, 1.00152, 1.0255, 1.201)).toBe(15)
    })
})