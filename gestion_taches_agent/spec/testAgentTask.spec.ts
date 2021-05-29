import { createConnection, getConnection, InsertResult } from "typeorm";
import { Task } from "../src/entity/Task";
import { Step } from "../src/entity/Step";
import { TaskModel } from "../src/entity/TaskModel";
import { UsedEquipment } from "../src/entity/UsedEquipment";
const request = require("supertest");

describe("Service Test 🧪 : ", () => {
  beforeAll(() => {
    console.log("FirstCall");
    return createConnection({
      name: "default",
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Task, TaskModel, Step, UsedEquipment],
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
      request("http://localhost:8000").get("/").expect(200);
    });
    it("Calls get method for all the Tasks URI ", () => {
      request("http://localhost:8000")
        .get("/task")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("Calls create method for the tasks URI ", () => {
      request("http://localhost:8000")
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
    it("Stores & Read & Updates new task model", async () => {
      console.log("Here ENV VAR : ", process.env.NODE_ENV);
      const taskExpectedToRead = Task.create({
        idAgent: 1009,
        idVehicle: 6790,
        taskTitle: "Task to read",
        description: "this is a task from the JASMINE tests",
        // taskModel:
        idTaskState: 4,
        /* assignmentDate: "11-05-2021",
        endDate: "25-05-2021", */
      });
      // Creation
      await taskExpectedToRead.save();

      const taskResultRead = await Task.findOneOrFail({
        taskTitle: "Task to read",
      });
      // Test Read
      expect(taskExpectedToRead).toEqual(taskResultRead);
      taskResultRead.taskTitle = "task Test Updated";
      const taskExpectedToUpdate = taskResultRead;

      // Test Updated
      const taskResultUpdate = await taskResultRead.save();
      expect(taskExpectedToUpdate).toEqual(taskResultUpdate);
    });

    it("Delete task", async () => {
      const taskData = Task.create({
        idAgent: 1009,
        idVehicle: 6790,
        taskTitle: "Task to delete",
        description: "this is a task from the JASMINE tests",
        // taskModel:
        idTaskState: 4,
        /* assignmentDate: "11-05-2021", 
        endDate: "25-05-2021",  */
      });
      await taskData.save();

      const taskExpected = await Task.findOneOrFail({
        taskTitle: "Task to delete",
      });

      const taskRemoved = await taskExpected.remove();
      expect(taskRemoved.idTask).toBeUndefined;
    });
  });

  describe("CRUD Operation on the DB 📊", () => {});
});

// const request = require("supertest");

// interface IData {
//   status?: number;
//   body?: string | any;
// }

// describe("Service Test : ", () => {
//   describe("Endpoint : /", () => {
//     let data: IData = {};

//     it("Returns welcome body successfully", (done) => {
//       request("http://localhost:8000")
//         .get("/")
//         .expect(200)
//         .end((err: Error, res: Response) => {
//           if (err) {
//             console.log(err);
//           }
//           const resultData = res.text;
//           const expectedData =
//             "Hello, this is the agent Tasks' management service.";
//           expect(resultData).toEqual(expectedData);
//           done();
//         });
//     });
//   });

//   describe("Endpoint : /task", () => {
//     let data: IData = {};

//     it("Returns all tasks successfully", (done) => {
//       request("http://localhost:8000")
//         .get("/task")
//         .expect(200)
//         .end((err: Error, res: any) => {
//           if (err) {
//             console.log(err);
//           }
//           const resultData = JSON.parse(res.text);
//           expect(resultData.length).toBeGreaterThan(0);
//           done();
//         });
//     });

//     it("Returns task id=8 successfully", (done) => {
//       request("http://localhost:8000")
//         .get("/task/8")
//         .expect(200)
//         .end((err: Error, res: any) => {
//           if (err) {
//             console.log(err);
//           }
//           const resultData = JSON.parse(res.text);
//           const expectedData = [
//             {
//               idTask: 8,
//               idAgent: 2,
//               idVehicle: 1,
//               description: "xxx",
//               idTaskState: 1,
//               idEquipment: 1,
//             },
//           ];
//           expect(resultData).toEqual(expectedData);
//           done();
//         });
//     });

//     it("Adds & delete a task successfully", (done) => {
//       const taskAdded = {
//         idAgent: 100,
//         idVehicle: 1,
//         description: "Another task ajoutée par les tests",
//         idTaskState: 1,
//         idEquipment: 1,
//       };
//       let idTaskAdded: Number = 0;
//       request("http://localhost:8000")
//         .post("/task")
//         .send(taskAdded)
//         .expect(200)
//         .end((err: Error, res: any) => {
//           if (err) {
//             console.log(err);
//           }
//           idTaskAdded = res.body.idTask;
//           expect(res.body.description).toEqual(taskAdded.description);
//           request("http://localhost:8000")
//             .delete(`/task/${idTaskAdded}`)
//             .expect(200)
//             .end((err: Error, _res: any) => {
//               if (err) {
//                 console.log(err);
//               }
//               done();
//             });
//         });
//     });

//     it("Updates task id=60, to a tested task, successfully", (done) => {
//       const updatedTask = {
//         idTask: 60,
//         idAgent: 1,
//         idVehicle: 1,
//         description: "Tested Task Now !!👌",
//         idTaskState: 1,
//         idEquipment: 1,
//       };
//       request("http://localhost:8000")
//         .put("/task/60")
//         .send(updatedTask)
//         .expect(200)
//         .end((err: Error, res: any) => {
//           if (err) {
//             console.log(err);
//           }
//           const resultData = JSON.parse(res.text);
//           expect(resultData).toEqual(updatedTask);
//           done();
//         });
//     });
//   });
// });
