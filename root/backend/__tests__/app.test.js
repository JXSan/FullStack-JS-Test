const server = require("../app");
const request = require("supertest");

const getCreditorsResponse = async () => {
  const response = await request(server).get("/api/creditor");

  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );

  expect(response.statusCode).toBe(200); // Check the 200 range.
};

const confirmCreditorStructure = async () => {
  const response = await request(server).get("/api/creditor");

  expect(response.body.results).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        id: expect.any(Number),
        creditorName: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        minPaymentPercentage: expect.any(Number),
        balance: expect.any(Number),
        selected: expect.any(Boolean),
      }),
    ])
  );
};

const postCreditor = async () => {
  const creditor = {
    id: Math.floor(Math.random() * 1000),
    creditorName: "TEST",
    firstName: "TEST",
    lastName: "TEST",
    minPaymentPercentage: 2,
    balance: 3000,
    selected: false,
  };

  const response = await request(server)
    .post("/api/creditor")
    .send({ creditor });

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("Post recieved.");
};

describe("Creditor API", () => {
  // GET REQUEST TESTING \\
  it("Route /api/creditor health check", getCreditorsResponse);
  it("Validate creditor request body structure", confirmCreditorStructure);

  // POST REQUEST TESTING \\
  it("POST `/api/creditor` : Should expect a 200 status code.", postCreditor);
});
