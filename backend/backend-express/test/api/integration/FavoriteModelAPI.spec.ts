import crypto from "crypto";
import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.API_URL;

describe("Favorite Model API", () => {
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    it("Should Favorite a new model only once", async () => {
        // Creating a user to be able to create a model
        const createUserData = {
            name: "Matheus test API",
            lastName: "Apostulo teste API",
            email: randomEmail,
            password: "password",
        }
        const responseCreateUser = await request(API_URL)
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
        
        // Favorite the model
        const responseFavoriteModel = await request(API_URL)
            .post(`/users/${responseCreateUser.body.id}/favorites/${responseCreateModel.body.id}`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .expect(200)

        expect(responseFavoriteModel.body.message).toBe("Model favorited successfully");

        // Should return an error if the user tries to favorite the same model again
        const responseFavoriteModelAgain = await request(API_URL)
            .post(`/users/${responseCreateUser.body.id}/favorites/${responseCreateModel.body.id}`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .expect(400)

        expect(responseFavoriteModelAgain.body.error_code).toBe("USER_ALREADY_FAVORITED");
        expect(responseFavoriteModelAgain.body.error_description).toBe("User already favorited this model");
    });

    it("Should return a 404 error if the model doesn't exist", async () => {  
        let randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
        // Creating a user to be able to create a model
        const createUserData = {
            name: "Matheus test API",
            lastName: "Apostulo teste API",
            email: randomEmail,
            password: "password",
        }
        const responseCreateUser = await request(API_URL)
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

        const responseGetModel = await request(API_URL)
            .post(`/users/${responseCreateUser.body.id}/favorites/invalid_model_id`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .expect(404)

        expect(responseGetModel.body.error_code).toBe("NOT_FOUND");
        expect(responseGetModel.body.error_description).toBe(`'invalid_model_id' not found`);
    });
});
