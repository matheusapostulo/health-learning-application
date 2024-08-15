import ApiExpress from "./infra/api/express/api.express";
import GetModelRoute from "./infra/api/express/routes/model/GetModel.express.route";
import { PrismaClientAdapter } from "./infra/database/PrismaClientAdapter";
import GetModel from "./application/usecase/GetModel";
import CreateModel from "./application/usecase/CreateModel";
import GetModelsByCategory from "./application/usecase/GetModelsByCategory";
import AuthenticateUser from "./application/usecase/AuthenticateUser";
import CreateUser from "./application/usecase/CreateUser";
import FavoriteModel from "./application/usecase/FavoriteModel";
import GetUser from "./application/usecase/GetUser";
import CreateModelRoute from "./infra/api/express/routes/model/CreateModel.express.route";
import GetModelsByCategoryRoute from "./infra/api/express/routes/model/GetModelsByCategory.express.route";
import AuthenticateUserRoute from "./infra/api/express/routes/user/AuthenticateUser.express.route";
import GetUserRoute from "./infra/api/express/routes/user/GetUser.express.route";
import CreateUserRoute from "./infra/api/express/routes/user/CreateUser.express.route";
import FavoriteModelRoute from "./infra/api/express/routes/user/FavoriteModel.express.route";
import UnfavoriteModelRoute from "./infra/api/express/routes/user/UnfavoriteModel.express.route";
import ModelRepositoryDatabase from "./infra/repository/ModelRepositoryDatabase";
import UserRepositoryDatabase from "./infra/repository/UserRepositoryDatabase";
import BcryptEncryptService from "./infra/services/BcryptEncryptService";
import JsonwebtokenJwtService from "./infra/services/JsonwebtokenJwtService";
import TransactionRepositoryDatabase from "./infra/repository/TransactionRepositoryDatabase";
import UnfavoriteModel from "./application/usecase/UnfavoriteModel";

function main() {
    // Connection to the database
    const connection = new PrismaClientAdapter();

    // Repository's
    const modelRepository = new ModelRepositoryDatabase(connection);
    const userRepository = new UserRepositoryDatabase(connection);
    const transactionRepository = new TransactionRepositoryDatabase(connection);

    // Others dependencies
    const encryptService = new BcryptEncryptService();
    const jwtService = new JsonwebtokenJwtService();

    // Importing use cases
    const getModel = new GetModel(connection);
    const createModel = new CreateModel(modelRepository);
    const getModelByCategory = new GetModelsByCategory(connection);
    const authenticateUser = new AuthenticateUser(connection, encryptService, userRepository, jwtService);
    const getUser = new GetUser(connection);
    const createUser = new CreateUser(userRepository, encryptService, connection);
    const favoriteModel = new FavoriteModel(userRepository, modelRepository, transactionRepository);
    const unfavoriteModel = new UnfavoriteModel(userRepository, modelRepository, transactionRepository);

    // Importing routes
    const getModelRoute = GetModelRoute.create(getModel);
    const createModelRoute = CreateModelRoute.create(createModel);
    const getModelByCategoryRoute = GetModelsByCategoryRoute.create(getModelByCategory); 
    const authenticateUserRoute = AuthenticateUserRoute.create(authenticateUser);
    const getUserRoute = GetUserRoute.create(getUser);
    const createUserRoute = CreateUserRoute.create(createUser);
    const favoriteModelRoute = FavoriteModelRoute.create(favoriteModel);
    const unfavoriteModelRoute = UnfavoriteModelRoute.create(unfavoriteModel);

    // Initialize the API
    const api = ApiExpress.create([
        getModelRoute, 
        createModelRoute, 
        getModelByCategoryRoute, 
        authenticateUserRoute, 
        getUserRoute, createUserRoute, 
        favoriteModelRoute, 
        unfavoriteModelRoute
    ], jwtService);
    const port = 3000;
    api.start(port);
}   

main();