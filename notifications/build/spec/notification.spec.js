"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
describe("Testing API calls", () => {
    it("Shows successfully a welcome message", () => {
        request("http://localhost:8000").get("/").expect(200);
    });
    it("Returns all breakdown notifications", () => {
        request("http://localhost:8000").get("/breakdown").expect(200);
    });
    it("Add a breakdown notification", () => {
        request("http://localhost:8000").post("/breakdown")
            .send({
            read: false,
            idPanne: 2,
        })
            .expect("Content-Type", /json/)
            .expect(200);
    });
    it("Marks a notification as seen", (done) => {
        request("http://localhost:8000").post("/breakdown")
            .send({
            read: false,
            idPanne: 2,
        })
            .expect("Content-Type", /json/)
            .expect(200)
            .end((_err, res) => {
            request("http://localhost:8000").put(`/breakdown/${JSON.parse(res.text).id}`)
                .send({
                read: true
            })
                .expect(200)
                .end((err, res) => {
                if (err)
                    console.log(err);
                else {
                    expect(JSON.parse(res.text).read).toBeTruthy();
                    request("http://localhost:8000").delete(`/breakdown/${JSON.parse(res.text).id}`)
                        .expect(200);
                }
            });
            done();
        });
    });
    it("Deletes a breakdown notification", (done) => {
        request("http://localhost:8000").post("/breakdown")
            .send({
            read: false,
            idPanne: 2,
        })
            .expect("Content-Type", /json/)
            .expect(200)
            .end((_err, res) => {
            request("http://localhost:8000").delete(`/breakdown/${JSON.parse(res.text).id}`)
                .expect(200);
            done();
        });
    });
});
//# sourceMappingURL=notification.spec.js.map