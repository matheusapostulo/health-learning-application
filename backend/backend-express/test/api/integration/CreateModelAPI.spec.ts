import crypto from "crypto";
const request = require("supertest");
const API_URL = process.env.API_URL || "http://host.docker.internal:3000";

describe("Create Model API", () => {
  const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
  it("Should Create a new model", async () => {
    // Creating a user to be able to create a model
    const createUserData = {
      name: "Matheus test API",
      lastName: "Apostulo teste API",
      email: randomEmail,
      password: "password",
    }
    await request(API_URL)
      .post('/users')
      .send(createUserData)
      .expect(201)

    // Authenticating the user to be able to create a model with a token
    const responseAuthUser = await request(API_URL)
      .post(`/auth/login`)
      .send({
          userEmail: randomEmail,
          password: "password",
      })
      .expect(200)

    // Creating a model
    const modelData = {
        modelName: "Cancer Model",
        description:"Model Test Cancer",
        category: "Pulmão",
        accuracy: 0.9787,
        parameters: [
          {
            name: "Attribute 1",
            type: "number"
          }
        ]
    }
    const responseCreateModel = await request(API_URL)
        .post('/models')
        .auth(responseAuthUser.body.token, { type: 'bearer' })
        .send(modelData)
        .expect(201)
    
    expect(responseCreateModel.body.id).toBeDefined();
  });
});
