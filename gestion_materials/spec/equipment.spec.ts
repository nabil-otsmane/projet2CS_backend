import { createConnection, getConnection, InsertResult } from "typeorm";
import { Equipment } from "../src/entity/Equipment";
import { Task } from "../src/entity/Task";
import { UsedEquipment } from "../src/entity/UsedEquipment";
const request = require("supertest");

describe("Service Test - Equipments - 🧪 : ", () => {
  beforeAll(() => {
    console.log("FirstCall");
    return createConnection({
      name: "default",
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Equipment, Task, UsedEquipment],
      synchronize: true,
      logging: false,
    });
  });

  afterAll(() => {
    console.log("LastCall");
    let conn = getConnection();
    return conn.close();
  });

  describe("API Calls Test 📢", () => {
    it("Returns welcome body successfully", () => {
      request("http://localhost:8080").get("/").expect(200);
    });
    it("Calls get method for all the equipments URI ", () => {
      request("http://localhost:8080")
        .get("/equipment")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("Calls create method for the equipments URI ", () => {
      request("http://localhost:8080")
        .post("/equipment")
        .send({
          equipmentName: "Huile",
          unitPrice: 6,
          category: "Liquide",
        })
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("Calls update method for the equipments URI ", () => {
      request("http://localhost:8080")
        .post("/equipment")
        .send({
          equipmentName: "Huile",
          unitPrice: 6,
          category: "Liquide",
        })
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("CRUD Operation on the DB 📊", () => {
    it("Stores & Read & Updates new equipment model", async () => {
      const equipExpectedToRead = Equipment.create({
        equipmentName: "Equipment to read",
        unitPrice: 1000,
        category: "Liquide",
      });
      // Creation
      await equipExpectedToRead.save();

      const equipResultRead = await Equipment.findOneOrFail({
        equipmentName: "Equipment to read",
      });
      // Test Read
      expect(equipExpectedToRead).toEqual(equipResultRead);
      equipResultRead.category = "CategoryTestUpdated";
      const equipExpectedToUpdate = equipResultRead;

      // Test Updated
      const equipResultUpdate = await equipResultRead.save();
      expect(equipExpectedToUpdate).toEqual(equipResultUpdate);
    });

    it("Delete equipment model", async () => {
      const equipData = Equipment.create({
        equipmentName: "Equipment to delete",
        unitPrice: 1000,
        category: "Liquide",
      });
      await equipData.save();

      const equipExpected = await Equipment.findOneOrFail({
        equipmentName: "Equipment to delete",
      });

      const equipRemoved = await equipExpected.remove();

      expect(equipRemoved.idEquipment).toBeUndefined;
    });
  });
});
