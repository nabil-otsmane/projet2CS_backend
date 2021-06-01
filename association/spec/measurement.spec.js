const MeasureDistance = require('../src/lib/measurement')

describe("distance measurement", function () {
    it("calculates distance between two coords", function () {
        expect(MeasureDistance(2.125885, 1.255454, 1.22365, 1.3154578)).toBe(100545)
    })
})