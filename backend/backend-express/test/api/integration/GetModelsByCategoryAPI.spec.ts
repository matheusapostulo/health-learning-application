import crypto from 'crypto';
import request from 'supertest';
const API_URL = process.env.API_URL || "http://host.docker.internal:3000";

describe("Get Model By Category API", () => {
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

        // Creating two models to test the get by category
        const modelData = {
            modelName: "Cancer Model",
            description:"Model Test Cancer",
            category: "Category Test API",
            accuracy: 0.9787,
            parameters: [
            {
                name: "Attribute 1",
                type: "number"
            }
            ]
        }
        await request(API_URL)
            .post('/models')
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .send(modelData)
            .expect(201)
        await request(API_URL)
            .post('/models')
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .send(modelData)
            .expect(201)
        
        const responseGetModel = await request(API_URL)
            .get(`/models/category/${modelData.category}`)
            .expect(200)

        expect(responseGetModel.body.length).toBeGreaterThan(2);
        expect(responseGetModel.body[0].category).toBe(modelData.category);
        expect(responseGetModel.body[1].category).toBe(modelData.category);
        
    });

    it("Should return a 404 error if the category model doesn't exist", async () => {  
        const responseGetModel = await request(API_URL)
            .get(`/models/category/fakecategory`)
            .expect(404)
        expect(responseGetModel.body.error_code).toBe("NOT_FOUND");
        expect(responseGetModel.body.error_description).toBe(`'Category' not found`);
    });
});