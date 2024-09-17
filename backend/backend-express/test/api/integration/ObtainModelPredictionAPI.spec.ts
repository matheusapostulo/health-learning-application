import crypto from "crypto";
import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.API_URL;

describe("Obtain Model Prediction API", () => {
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;

    let inputObtainModelPrediction, modelData, responseCreateModel, responseAuthUser, responseCreateUser;
    beforeAll(async () => {
        // Creating a user to be able to create a model
        const createUserData = {
            name: "Matheus test API",
            lastName: "Apostulo teste API",
            email: randomEmail,
            password: "password",
        }
        responseCreateUser = await request(API_URL)
            .post('/users')
            .send(createUserData)
            .expect(201)

        // Authenticating the user to be able to create a model with a token
        responseAuthUser = await request(API_URL)
            .post(`/auth/login`)
            .send({
                userEmail: randomEmail,
                password: "password",
            })
            .expect(200)

        // Creating a model
        modelData = {
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
        responseCreateModel = await request(API_URL)
            .post('/models')
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .send(modelData)
            .expect(201)
        
        // Obtain the model prediction
        inputObtainModelPrediction = {
            userId: responseCreateUser.body.id,
            modelId: responseCreateModel.body.id,
            parameters: [
                {
                    name: "gender",
                    value: false,
                },
                {
                    name: "age",
                    value: "59",
                },
                {
                    name: "smoker",
                    value: false,
                },
                {
                    name: "yellow_fingers",
                    value: false,
                },
                {
                    name: "anxiety",
                    value: false,
                },
                {
                    name: "peer_pressure",
                    value: true,
                },
                {
                    name: "chronic_disease",
                    value: false,
                },
                {
                    name: "fatigue",
                    value: true,
                },
                {
                    name: "allergy",
                    value: false,
                },
                {
                    name: "wheezing",
                    value: true,
                },
                {
                    name: "alcohol_consume",
                    value: false,
                },
                {
                    name: "coughing",
                    value: true,
                },
                {
                    name: "shortness_of_breath",
                    value: true,
                },
                {
                    name: "swallowing_difficulty",
                    value: false,
                },
                {
                    name: "chest_pain",
                    value: true,
                },
            ],
        }
    });
    
    it("Should Obtain a Model Prediction", async () => {
        const responseObtainModelPrediction = await request(API_URL)
            .post(`/users/${responseCreateUser.body.id}/models/${responseCreateModel.body.id}/prediction`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .send(inputObtainModelPrediction)
            .expect(200)

        expect(responseObtainModelPrediction.body).toHaveProperty("predictionResult");
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

        // Should return a 404 error if the parameters are invalid
        const responseObtainModelPrediction = await request(API_URL)
            .post(`/users/${responseCreateUser.body.id}/models/invalid_model_id/prediction`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .send(inputObtainModelPrediction)
            .expect(404)

        expect(responseObtainModelPrediction.body.error_code).toBe("NOT_FOUND");
        expect(responseObtainModelPrediction.body.error_description).toBe(`'invalid_model_id' not found`);
    });

    it("Should return a 404 error if the parameters are invalid", async () => {
        const responseObtainModelPrediction = await request(API_URL)
            .post(`/users/${responseCreateUser.body.id}/models/${responseCreateModel.body.id}/prediction`)
            .auth(responseAuthUser.body.token, { type: 'bearer' })
            .send({
                userId: responseCreateUser.body.id,
                modelId: responseCreateModel.body.id,
                parameters: [{
                    name: "invalid_parameter",
                    value: "invalid_value"
                }]
            })
            .expect(400)
            
        expect(responseObtainModelPrediction.body.error_code).toBe("REQUIRED_PARAMETERS");
        expect(responseObtainModelPrediction.body.error_description).toBe("Parameter 'parameters' is required");
    });
});
