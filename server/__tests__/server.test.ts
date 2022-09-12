import app from "../index";
import request from "supertest";

// ADD GET endpoint tests

// WELCOME
describe("GET /responds with a welcome message", () => {
  it("should return welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual(`\"Welcome!\"`);
  });
  it("should return 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
    // await request(app).get("/").end();
  });
});

// DEVELOPERS ENDPOINT
describe("GET /developers", () => {
  it("should return all developers", async () => {
    const response = await request(app).get("/developers");

    if (response.body.length) {
      expect(typeof response.body[0].developer_id).toBe("number");
      expect(typeof response.body[0].first_name).toBe("string");
      expect(typeof response.body[0].last_name).toBe("string");
    }
  });
  it("should return 200", async () => {
    const response = await request(app).get("/developers");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
    // await request(app).get("/developers").end();
  });
});

// ROSTERS ENDPOINT
describe("GET /rosters", () => {
  it("should return all rosters", async () => {
    const response = await request(app).get("/rosters");

    if (response.body.length) {
      expect(typeof response.body[0].id).toBe("number");
      expect(typeof response.body[0].developer_id).toBe("number");
    }
  });
  it("should return 200", async () => {
    const response = await request(app).get("/rosters");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
    // await request(app).get("/developers").end();
  });
});

// ADD POST endpoint tests

describe("POST /developers", () => {
  const newDeveloper = {
    developer_id: 90,
    first_name: "John",
    last_name: "Doe",
  };
  afterAll(async () => {
    await request(app).delete("/developers").send(newDeveloper);
  });
  it("should add a developer", async () => {
    const response = await request(app).post("/developers").send(newDeveloper);
    expect(response.statusCode).toBe(201);
  });
});

// ADD PUT endpoint tests

describe("PUT /developers", () => {
  const newDeveloper = {
    developer_id: 91,
    first_name: "Elon",
    last_name: "Musk",
  };

  beforeAll(async () => {
    await request(app).post("/developers").send(newDeveloper);
  });
  afterAll(async () => {
    await request(app).delete(`/developers/`);
  });
  it("should update developer if they exist", async () => {
    const response = await request(app).put(`/developers`).send({
      developer_id: 91,
      first_name: "Tesla",
      last_name: "Musk",
    });
    expect(response.statusCode).toBe(201);
  });
});

// ADD DELETE endpoint tests

describe("DELETE/developers", () => {
  const newDeveloper = {
    developer_id: 92,
    first_name: "Jeff",
    last_name: "Bezos",
  };
  beforeAll(async () => {
    await request(app).post("/developers").send(newDeveloper);
  });
  it("should delete one developer", async () => {
    const response = await request(app)
      .delete("/developers")
      .send({ developer_id: 92 });

    if (response.body.length) {
      const exists = response.body.find(
        (id: number) => newDeveloper.developer_id == id
      );
      expect(exists).toBe(undefined);
    } else {
      expect(response.body.length).toBe(undefined);
    }
  });
  it("should delete all developers", async () => {
    const response = await request(app).delete("/developers");
    expect(response.body.length).toBe(0);
  });
});

// TODO
// add the rest of API tests (POST, PUT, DELETE) for rosters
// add the rest of API tests tests (POST, DELETE) for rosters-criteria
