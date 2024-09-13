import crypto from "crypto";
const request = require("supertest");
const API_URL = process.env.API_URL || "http://host.docker.internal:3000";

describe("Create User API", () => {
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    it("Should Create a new user", async () => {
        const userData = {
            name: "Matheus test API",
            lastName: "Apostulo teste API",
            email: randomEmail,
            password: "password",
        }
    
        const response = await request(API_URL)
            .post('/users')
            .send(userData)
            .expect(201)
        
        expect(response.body.id).toBeDefined();
    
    });

    it("Shouldn't create a user if the email already exists", async () => {
        const userData = {
            name: "Matheus test API",
            lastName: "Apostulo teste API",
            email: randomEmail,
            password: "password",
        }

        const response = await request(API_URL)
            .post('/users')
            .send(userData)
            .expect(400)

        expect(response.body.error_code).toBe("USER_ALREADY_EXISTS");
        expect(response.body.error_description).toBe(`User with email '${randomEmail}' already exists`);
    });
});
