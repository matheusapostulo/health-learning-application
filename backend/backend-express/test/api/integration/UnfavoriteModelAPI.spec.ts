import crypto from "crypto";
const request = require("supertest");
const API_URL = process.env.API_URL || "http://host.docker.internal:3000";

describe("Unfavorite Model API", () => {
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    it("Should Unfavorite a new model only once", async () => {
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
        await request(API_URL)
            .post(`/users/${responseCreateUser.body.id}/favorites/${responseCreateModel.body.id}`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .expect(200)
        
        // Unfavorite the model
        const responseUnfavoriteModel = await request(API_URL)
            .delete(`/users/${responseCreateUser.body.id}/favorites/${responseCreateModel.body.id}`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .expect(200)

        expect(responseUnfavoriteModel.body.message).toBe("Model unfavorited successfully");
        
        // Should return an NOT FOUND ERROR if the user tries to unfavorite the same model again
        const responseUnfavoriteModelAgain = await request(API_URL)
            .delete(`/users/${responseCreateUser.body.id}/favorites/${responseCreateModel.body.id}`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .expect(400)

        expect(responseUnfavoriteModelAgain.body.error_code).toBe("USER_FAVORITES_NOT_FOUND");
        expect(responseUnfavoriteModelAgain.body.error_description).toBe("User does not have this model as favorite");
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
            .delete(`/users/${responseCreateUser.body.id}/favorites/invalid_model_id`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .expect(404)
            
        expect(responseGetModel.body.error_code).toBe("NOT_FOUND");
        expect(responseGetModel.body.error_description).toBe("'invalid_model_id' not found");

    });
});
