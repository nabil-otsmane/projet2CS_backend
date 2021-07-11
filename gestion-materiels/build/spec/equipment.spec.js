"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Equipment_1 = require("../src/entity/Equipment");
const Task_1 = require("../src/entity/Task");
const UsedEquipment_1 = require("../src/entity/UsedEquipment");
const request = require("supertest");
describe("Service Test 🧪 : ", () => {
    beforeAll(() => {
        console.log("FirstCall");
        return typeorm_1.createConnection({
            name: "default",
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [Equipment_1.Equipment, Task_1.Task, UsedEquipment_1.UsedEquipment],
            synchronize: true,
            logging: false,
        });
    });
    afterAll(() => {
        console.log("LastCall");
        let conn = typeorm_1.getConnection();
        return conn.close();
    });
    describe("API Calls Test 📢", () => {
        it("Returns welcome body successfully", () => {
            request("http://localhost:8080").get("/").expect(200);
        });
        it("Calls get method for all the equipments URI ", () => {
            request("http://localhost:8080")
                .get("/tasks")
                .expect("Content-Type", /json/)
                .expect(200);
        });
        it("Calls create method for the equipments URI ", () => {
            request("http://localhost:8080")
                .post("/task")
                .send({
                idAgent: 100,
                idVehicle: 1,
                description: "Task from unit test JASMINE",
                taskTitle: "Unit test",
                idTaskState: 1,
                idTaskModel: 3,
            })
                .expect("Content-Type", /json/)
                .expect(200);
        });
    });
    describe("CRUD Operation on the DB 📊", () => {
        it("Stores & Read & Updates new equipment model", () => __awaiter(void 0, void 0, void 0, function* () {
            const equipExpectedToRead = Equipment_1.Equipment.create({
                equipmentName: "Equipment to read",
                unitPrice: 1000,
                category: "Liquide",
            });
            yield equipExpectedToRead.save();
            const equipResultRead = yield Equipment_1.Equipment.findOneOrFail({
                equipmentName: "Equipment to read",
            });
            expect(equipExpectedToRead).toEqual(equipResultRead);
            equipResultRead.category = "CategoryTestUpdated";
            const equipExpectedToUpdate = equipResultRead;
            const equipResultUpdate = yield equipResultRead.save();
            expect(equipExpectedToUpdate).toEqual(equipResultUpdate);
        }));
        it("Delete equipment model", () => __awaiter(void 0, void 0, void 0, function* () {
            const equipData = Equipment_1.Equipment.create({
                equipmentName: "Equipment to delete",
                unitPrice: 1000,
                category: "Liquide",
            });
            yield equipData.save();
            const equipExpected = yield Equipment_1.Equipment.findOneOrFail({
                equipmentName: "Equipment to delete",
            });
            const equipRemoved = yield equipExpected.remove();
            expect(equipRemoved.idEquipment).toBeUndefined;
        }));
    });
});
//# sourceMappingURL=equipment.spec.js.map