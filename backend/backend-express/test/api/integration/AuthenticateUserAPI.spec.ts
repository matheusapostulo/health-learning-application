import crypto from 'crypto';
import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.API_URL;

describe("Authenticate User API", () => {
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    it("Should return a user by id", async () => {
        // Creating a user first
        const userData = {
            name: "Matheus test Auth API",
            lastName: "Apostulo test Auth API",
            email: randomEmail,
            password: "password",
        }
    
        await request(API_URL)
            .post('/users')
            .send(userData)
            .expect(201)
 
        const responseAuthUser = await request(API_URL)
            .post(`/auth/login`)
            .send({
                userEmail: randomEmail,
                password: "password",
            })
            .expect(200)

        expect(responseAuthUser.body.token).toBeDefined();

    });

    it("Should return a 404 error if the user doesn't exist", async () => {  
        const wrongEmail = "doesntexist@gmail.com"
        const responseAuthUser = await request(API_URL)
            .post(`/auth/login`)
            .send({
                userEmail: wrongEmail,
                password: "password",
            })
            .expect(404)

        expect(responseAuthUser.body.error_code).toBe("NOT_FOUND");
        expect(responseAuthUser.body.error_description).toBe(`'${wrongEmail}' not found`);
    });

    it("Should return a 400 error if the password is incorrect", async () => {
        const userData = {
            name: "Matheus test Auth API",
            lastName: "Apostulo test Auth API",
            email: randomEmail,
            password: "password",
        }
    
        await request(API_URL)
            .post('/users')
            .send(userData)
            .expect(400)
 
        const responseAuthUser = await request(API_URL)
            .post(`/auth/login`)
            .send({
                userEmail: randomEmail,
                password: "wrongpassword",
            })
            .expect(400)

        expect(responseAuthUser.body.error_code).toBe("INVALID_PASSWORD");
        expect(responseAuthUser.body.error_description).toBe(`Invalid password`);
    });
});