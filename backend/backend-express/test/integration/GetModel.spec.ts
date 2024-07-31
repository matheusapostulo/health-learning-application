import DatabaseConnectionMemory from "../../src/infra/database/memory/DatabaseConnectionMemory";
import GetModel from "../../src/application/usecase/GetModel";
import Model, { typeParameter } from "../../src/domain/Model";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import ModelRepositoryDatabase from "../../src/infra/repository/ModelRepositoryDatabase";
import CreateModel from "../../src/application/usecase/CreateModel";

const inputCreateModel = {
    modelName: "Model Test Get Model",
    category: 'Test',
    description:'Model Test Description',
    accuracy: 0.885,
    parameters: [
        {
            name: "Attribute 1",
            type: typeParameter.Number,
        },
    ],
}

it("Should get a Machine Learning Model in memory", async () => {
    const connection = new DatabaseConnectionMemory();
    const getModel = new GetModel(connection);
    
    const model = Model.create(inputCreateModel.modelName, inputCreateModel.category, inputCreateModel.description, inputCreateModel.accuracy, inputCreateModel.parameters);
    await connection.createModel(model);
    const outputGetModel = await getModel.execute(model.modelId);
    
    expect(outputGetModel.modelId).toBe(model.modelId);
    expect(outputGetModel.modelName).toBe("Model Test Get Model");
    expect(outputGetModel.description).toBe("Model Test Description");
    expect(outputGetModel.accuracy).toBe(0.885);
    expect(outputGetModel.parameters[0].name).toBe("Attribute 1");
    expect(outputGetModel.parameters[0].type).toBe("number");
});

it("Should get a Machine Learning Model in database", async () => {
    const connection = new PrismaClientAdapter();
    const modelRepository = new ModelRepositoryDatabase(connection);
    const createModel = new CreateModel(modelRepository);
    const outputCreateModel = await createModel.execute(inputCreateModel);
    
    const getModel = new GetModel(connection);
    // Consulting if the model was created right
    const outputGetModel = await getModel.execute(outputCreateModel.modelId);
    expect(outputGetModel.modelId).toBe(outputCreateModel.modelId);
    expect(outputGetModel.modelName).toBe("Model Test Get Model");
    expect(outputGetModel.category).toBe("Test");
    expect(outputGetModel.description).toBe("Model Test Description");
    expect(outputGetModel.accuracy).toBe(0.885);
    expect(outputGetModel.parameters[0].name).toBe("Attribute 1");
    expect(outputGetModel.parameters[0].type).toBe("number");
    connection.close();
});