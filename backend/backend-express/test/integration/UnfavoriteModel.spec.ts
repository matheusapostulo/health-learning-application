import CreateModel from "../../src/application/usecase/CreateModel";
import CreateUser from "../../src/application/usecase/CreateUser";
import FavoriteModel from "../../src/application/usecase/FavoriteModel";
import UnfavoriteModel from "../../src/application/usecase/UnfavoriteModel";
import GetModel from "../../src/application/usecase/GetModel";
import GetUser from "../../src/application/usecase/GetUser";
import { typeParameter } from "../../src/domain/Model";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import ModelRepositoryDatabase from "../../src/infra/repository/ModelRepositoryDatabase";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import BcryptEncryptService from "../../src/infra/services/BcryptEncryptService";
import crypto from "crypto";
import TransactionRepositoryDatabase from "../../src/infra/repository/TransactionRepositoryDatabase";

it("Should unfavorite a model by a user", async () => {
    // Dependencies implementations
    const connection = new PrismaClientAdapter();
    const userRepository = new UserRepositoryDatabase(connection);
    const modelRepository = new ModelRepositoryDatabase(connection);
    const transactionRepository = new TransactionRepositoryDatabase(connection);
    const encryptService = new BcryptEncryptService();
    const getModel = new GetModel(connection);
    const getUser = new GetUser(connection);
    // Instance of the favoriteModel use case
    const favoriteModel = new FavoriteModel(userRepository, modelRepository, transactionRepository);
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
    const outputGetModelFavorite = await getModel.execute(outputCreateModel.id);
    expect(outputGetModelFavorite.favoritedBy[0]).toBe(outputCreateUser.id);
    // Get the user to check if it favorited the model
    const outputGetUserFavorite = await getUser.execute(randomEmail);
    expect(outputGetUserFavorite.favoritedModels[0]).toBe(outputCreateModel.id);

    // Unfavorite a model
    const unfavoriteModel = new UnfavoriteModel(userRepository, modelRepository, transactionRepository);
    await unfavoriteModel.execute(inputFavoriteModel);
    // Get the model to check if it was unfavorited
    const outputGetModelUnfavorite = await getModel.execute(outputCreateModel.id);
    expect(outputGetModelUnfavorite.favoritedBy.length).toBe(0);
    // Get the user to check if it unfavorited the model
    const outputGetUserUnfavorite = await getUser.execute(randomEmail);
    expect(outputGetUserUnfavorite.favoritedModels.length).toBe(0);

    // Testing if is there an error when user already unfavorited a model that wasn't favorited
    try {
        await unfavoriteModel.execute(inputFavoriteModel);
    } catch (error) {
        expect(error.message).toBe("User does not have this model as favorite");
    };

    await connection.close();
});