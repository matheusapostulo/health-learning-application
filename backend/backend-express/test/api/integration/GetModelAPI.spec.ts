import crypto from 'crypto';
import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.API_URL;

describe("Get Model API", () => {
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    it("Should return a model by id", async () => {
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
        
        const responseGetModel = await request(API_URL)
            .get(`/models/${responseCreateModel.body.id}`)
            .expect(200)

        expect(responseGetModel.body.modelName).toBe(modelData.modelName);
        expect(responseGetModel.body.description).toBe(modelData.description);
        expect(responseGetModel.body.category).toBe(modelData.category);
    });

    it("Should return a 404 error if the model doesn't exist", async () => {  
        const responseGetModel = await request(API_URL)
            .get(`/models/12345678`)
            .expect(404)
        expect(responseGetModel.body.error_code).toBe("NOT_FOUND");
        expect(responseGetModel.body.error_description).toBe(`'12345678' not found`);
    });
});