import CreateModel from "../../src/application/usecase/CreateModel";
import CreateUser from "../../src/application/usecase/CreateUser";
import GetModel from "../../src/application/usecase/GetModel";
import GetUser from "../../src/application/usecase/GetUser";
import FavoriteModel from "../../src/application/usecase/FavoriteModel";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import ModelRepositoryDatabase from "../../src/infra/repository/ModelRepositoryDatabase";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";
import { typeParameter } from "../../src/domain/Model";
import crypto from "crypto";

it("Should favorite a model by a user", async () => {
    // Dependencies implementations
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);
    const modelRepository = new ModelRepositoryDatabase(connection);
    const encryptService = new BcryptEncryptService();
    const getModel = new GetModel(connection);
    const getUser = new GetUser(connection);
    // Instance of the favoriteModel use case
    const favoriteModel = new FavoriteModel(connection, userRepository, modelRepository);
    // Instance of other required use cases
    const createUser = new CreateUser(userRepository, encryptService, connection);
    const createModel = new CreateModel(modelRepository);
    // Input to create a model
    const inputCreateModel = {
        modelName: "Model Test Create Model",
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
    // Favorite a model
    const inputFavoriteModel = {
        userEmail: inputCreateUser.email,
        modelId: outputCreateModel.id,
    };
    await favoriteModel.execute(inputFavoriteModel);
    // Get the model to check if it was favorited
    const outputGetModel = await getModel.execute(outputCreateModel.id);
    expect(outputGetModel.favoritedBy[0]).toBe(outputCreateUser.id);
    // Get the user to check if it favorited the model
    const outputGetUser = await getUser.execute(randomEmail);
    expect(outputGetUser.favoritedModels[0]).toBe(outputCreateModel.id);
    
    await connection.close();
});