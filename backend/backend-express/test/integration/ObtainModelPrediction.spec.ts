import crypto from "crypto";
import CreateUser from "../../src/application/usecase/CreateUser";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";
import ModelRepositoryDatabase from "../../src/infra/repository/ModelRepositoryDatabase";
import GetUser from "../../src/application/usecase/GetUser";
import CreateModel from "../../src/application/usecase/CreateModel";
import ObtainModelPrediction from "../../src/application/usecase/ObtainModelPrediction";
import { typeParameter } from "../../src/domain/Model";
import LungCancerModelPredictionStrategy from "../../src/application/strategy/LungCancerModelPredictionStrategy.ts";
import RequiredParametersError from "../../src/application/errors/RequiredParameters.error.ts";

it("Should obtain model prediction", async () => {
    // We'll create a user and a model to test the prediction
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);
    const modelRepository = new ModelRepositoryDatabase(connection);
    const encryptService = new BcryptEncryptService();
    const getUser = new GetUser(connection);
    const lungCancerModelPredictionStrategy = new LungCancerModelPredictionStrategy("/predict/lung-cancer");
    // Instance of other required use cases
    const createUser = new CreateUser(userRepository, encryptService, connection);
    const createModel = new CreateModel(modelRepository);
    // Instance of prediction use case
    const obtainModelPrediction = new ObtainModelPrediction(connection, userRepository, lungCancerModelPredictionStrategy);
    // Input to create a model
    const inputCreateModel = {
        modelName: "Câncer de Pulmão",
        description:'Esse modelo prevê a chance de um paciente ter câncer de pulmão.',
        category: 'Pulmão',
        accuracy: 0.9787,
        parameters: [
            {
                name: "Gênero",
                type: typeParameter.Boolean,
            },{
                name: "Idade",
                type: typeParameter.Number,
            }, {
                name: "Fumante",
                type: typeParameter.Boolean,
            },
            {
                name: "Dedos Amarelos",
                type: typeParameter.Boolean,
            },
            {
                name: "Ansiedade",
                type: typeParameter.Boolean,
            }, 
            {
                name: "Pressão dos Pares",
                type: typeParameter.Boolean,
            },
            {
                name: "Doença Crônica",
                type: typeParameter.Boolean,
            },
            {
                name: "Fadiga",
                type: typeParameter.Boolean,
            },
            {
                name: "Alergia",
                type: typeParameter.Boolean,
            },
            {
                name: "Chiado",
                type: typeParameter.Boolean,
            },
            {
                name: "Consumo de Álcool",
                type: typeParameter.Boolean,
            },
            {
                name: "Tosse",
                type: typeParameter.Boolean,
            },
            {
                name: "Falta de Ar",
                type: typeParameter.Boolean,
            },
            {
                name: "Dificuldade para Engolir",
                type: typeParameter.Boolean,
            },
            {
                name: "Dor no Peito",
                type: typeParameter.Boolean,
            }

        ],
        createdAt: new Date(),
    }
    // Inputs to create a user
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    const inputCreateUser = {
        name: "Matheus",
        lastName: "Henrique",
        email: randomEmail,
        password: "123456",
    }
    // Creating a model
    const outputCreateModel = await createModel.execute(inputCreateModel);
    // Creating a user
    const outputCreateUser = await createUser.execute(inputCreateUser);
    // Predict a model
    if(outputCreateModel.isRight() && outputCreateUser.isRight()){
        const inputObtainModelPrediction = {
            userId: outputCreateUser.value.id,
            modelId: outputCreateModel.value.id,
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
        const outputObtainModelPrediction = await obtainModelPrediction.execute(inputObtainModelPrediction);
        console.log(outputObtainModelPrediction);
        expect(outputObtainModelPrediction.isRight()).toBeTruthy();
        if(outputObtainModelPrediction.isRight()){
            let getUserOutput = await getUser.execute(outputCreateUser.value.id);
            if(getUserOutput.isRight()){
                expect(getUserOutput.value.predictions[0].modelId).toBe(outputCreateModel.value.id);
            }
        }
    }    

    await connection.close();
});

it("Should throw a error when a required paramater is missing", async () => {
    // We'll create a user and a model to test the prediction
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);
    const modelRepository = new ModelRepositoryDatabase(connection);
    const encryptService = new BcryptEncryptService();
    const getUser = new GetUser(connection);
    const lungCancerModelPredictionStrategy = new LungCancerModelPredictionStrategy("/predict/lung-cancer");
    // Instance of other required use cases
    const createUser = new CreateUser(userRepository, encryptService, connection);
    const createModel = new CreateModel(modelRepository);
    // Instance of prediction use case
    const obtainModelPrediction = new ObtainModelPrediction(connection, userRepository, lungCancerModelPredictionStrategy);
    // Input to create a model
    const inputCreateModel = {
        modelName: "Model Test Obtain Prediction Model",
        description:'Model Test Description',
        category: 'Test',
        accuracy: 0.885,
        parameters: [
            {
            name: "Attribute 1",
            type: typeParameter.Number,
            },
        ],
        createdAt: new Date(),
    }
    // Inputs to create a user
    const randomEmail = `${crypto.randomBytes(10).toString('hex')}@test.com`;
    const inputCreateUser = {
        name: "User",
        lastName: "Test",
        email: randomEmail,
        password: "123456",
    }
    // Creating a model
    const outputCreateModel = await createModel.execute(inputCreateModel);
    // Creating a user
    const outputCreateUser = await createUser.execute(inputCreateUser);
    // Predict a model
    if(outputCreateModel.isRight() && outputCreateUser.isRight()){
        const inputObtainModelPrediction = {
            userId: outputCreateUser.value.id,
            modelId: outputCreateModel.value.id,
            parameters: [
                {
                    name: "gender",
                    value: 2,
                },
                {
                    name: "smoker",
                    value: 1,
                },
                {
                    name: "yellow_fingers",
                    value: 2,
                },
                {
                    name: "anxiety",
                    value: 2,
                },
                {
                    name: "peer_pressure",
                    value: 1,
                },
                {
                    name: "chronic_disease",
                    value: 1,
                },
                {
                    name: "fatigue",
                    value: 2,
                },
                {
                    name: "allergy",
                    value: 1,
                },
                {
                    name: "wheezing",
                    value: 2,
                },
                {
                    name: "alcohol_consume",
                    value: 2,
                },
                {
                    name: "coughing",
                    value: 2,
                },
                {
                    name: "shortness_of_breath",
                    value: 2,
                },
                {
                    name: "swallowing_difficulty",
                    value: 2,
                },
                {
                    name: "chest_pain",
                    value: 2,
                },
            ],
        }
        const outputObtainModelPrediction = await obtainModelPrediction.execute(inputObtainModelPrediction);
        expect(outputObtainModelPrediction.isLeft()).toBeTruthy();
        if(outputObtainModelPrediction.isLeft()){
            expect(outputObtainModelPrediction.value).toBeInstanceOf(RequiredParametersError);
        }
    }    

    await connection.close();
});