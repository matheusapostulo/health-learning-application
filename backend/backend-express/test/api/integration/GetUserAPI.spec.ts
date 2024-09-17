import crypto from 'crypto';
import request from 'supertest';
const API_URL = process.env.API_URL || "http://host.docker.internal:3000";

describe("Get User API", () => {
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    it("Should return a user by id", async () => {
        // Creating a user first
        const userData = {
            name: "Matheus test Get API",
            lastName: "Apostulo test Get API",
            email: randomEmail,
            password: "password",
        }
    
        const responseCreateUser = await request(API_URL)
            .post('/users')
            .send(userData)
            .expect(201)
        
        const responseGetUser = await request(API_URL)
            .get(`/users/${responseCreateUser.body.id}`)
            .expect(200)

        expect(responseGetUser.body.id).toBe(responseCreateUser.body.id);
        expect(responseGetUser.body.name).toBe(userData.name);
        expect(responseGetUser.body.lastName).toBe(userData.lastName);
        expect(responseGetUser.body.email).toBe(userData.email);
    });

    it("Should return a 404 error if the user doesn't exist", async () => {  
        const responseGetUser = await request(API_URL)
            .get(`/users/12345678`)
            .expect(404)

        expect(responseGetUser.body.error_code).toBe("NOT_FOUND");
        expect(responseGetUser.body.error_description).toBe(`'12345678' not found`);
    });
});