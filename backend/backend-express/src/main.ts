import GetModel from "./application/usecase/GetModel";
import ApiExpress from "./infra/api/express/api.express";
import GetModelRoute from "./infra/api/express/routes/model/GetModel.express.route";
import { PrismaClientAdapter } from "./infra/database/PrismaClientAdapter";

function main() {
    // Connection to the database
    const connection = new PrismaClientAdapter();
    // Importing use cases
    const getModel = new GetModel(connection);
    // Importing routes
    const getModelRoute = GetModelRoute.create(getModel);
    // Initialize the API
    const api = ApiExpress.create([getModelRoute]);
    const port = 3000;
    api.start(port);
}

main();