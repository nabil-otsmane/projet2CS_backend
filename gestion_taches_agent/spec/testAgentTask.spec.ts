const request = require("supertest");

interface IData {
  status?: number;
  body?: string | any;
}

describe("Service Test : ", () => {
  describe("Endpoint : /", () => {
    let data: IData = {};

    it("Returns welcome body successfully", (done) => {
      request("http://localhost:8000")
        .get("/")
        .expect(200)
        .end((err: Error, res: Response) => {
          if (err) {
            console.log(err);
          }
          const resultData = res.text;
          const expectedData =
            "Hello, this is the agent Tasks' management service.";
          expect(resultData).toEqual(expectedData);
          done();
        });
    });
  });

  describe("Endpoint : /task", () => {
    let data: IData = {};

    it("Returns all tasks successfully", (done) => {
      request("http://localhost:8000")
        .get("/task")
        .expect(200)
        .end((err: Error, res: any) => {
          if (err) {
            console.log(err);
          }
          const resultData = JSON.parse(res.text);
          expect(resultData.length).toBeGreaterThan(0);
          done();
        });
    });

    it("Returns task id=8 successfully", (done) => {
      request("http://localhost:8000")
        .get("/task/8")
        .expect(200)
        .end((err: Error, res: any) => {
          if (err) {
            console.log(err);
          }
          const resultData = JSON.parse(res.text);
          const expectedData = {
            idTask: 8,
            idAgent: 2,
            idVehicle: 1,
            description: "maintenance task :))",
            idTaskState: 1,
            idEquipment: 1,
          };
          expect(resultData).toEqual(expectedData);
          done();
        });
    });

    it("Adds & delete a task successfully", (done) => {
      const taskAdded = {
        idAgent: 100,
        idVehicle: 1,
        description: "Another task ajoutée par les tests",
        idTaskState: 1,
        idEquipment: 1,
      };
      let idTaskAdded: Number = 0;
      request("http://localhost:8000")
        .post("/task")
        .send(taskAdded)
        .expect(200)
        .end((err: Error, res: any) => {
          if (err) {
            console.log(err);
          }
          idTaskAdded = res.body.idTask;
          expect(res.body.description).toEqual(taskAdded.description);
          request("http://localhost:8000")
            .delete(`/task/${idTaskAdded}`)
            .expect(200)
            .end((err: Error, _res: any) => {
              if (err) {
                console.log(err);
              }
              done();
            });
        });
    });

    it("Updates task id=5, to a tested task, successfully", (done) => {
      const updatedTask = {
        idTask: 5,
        idAgent: 1,
        idVehicle: 1,
        description: "Tested Task Now !!👌",
        idTaskState: 1,
        idEquipment: 1,
      };
      request("http://localhost:8000")
        .put("/task/5")
        .send(updatedTask)
        .expect(200)
        .end((err: Error, res: any) => {
          if (err) {
            console.log(err);
          }
          const resultData = JSON.parse(res.text);
          expect(resultData).toEqual(updatedTask);
          done();
        });
    });
  });
});
