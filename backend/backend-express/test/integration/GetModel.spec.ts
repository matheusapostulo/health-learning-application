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
    
    const modelOrError = Model.create(inputCreateModel.modelName, inputCreateModel.category, inputCreateModel.description, inputCreateModel.accuracy, inputCreateModel.parameters);
    if(modelOrError.isRight()){
        const model: Model = modelOrError.value;
        await connection.create(model);

        const outputGetModel = await getModel.execute(model.id);
    
        if(outputGetModel.isRight()){
            expect(outputGetModel.value.id).toBe(model.id);
            expect(outputGetModel.value.modelName).toBe("Model Test Get Model");
            expect(outputGetModel.value.description).toBe("Model Test Description");
            expect(outputGetModel.value.accuracy).toBe(0.885);
            expect(outputGetModel.value.parameters[0].name).toBe("Attribute 1");
            expect(outputGetModel.value.parameters[0].type).toBe("number");
        }
    }
});

it("Should get a Machine Learning Model in database", async () => {
    const connection = new PrismaClientAdapter();
    const modelRepository = new ModelRepositoryDatabase(connection);
    const createModel = new CreateModel(modelRepository);

    const outputCreateModel = await createModel.execute(inputCreateModel);
    if(outputCreateModel.isRight()){
        const getModel = new GetModel(connection);
        // Consulting if the model was created right
        const outputGetModel = await getModel.execute(outputCreateModel.value.id);

        if(outputGetModel.isRight()){
            expect(outputGetModel.value.id).toBe(outputCreateModel.value.id);
            expect(outputGetModel.value.modelName).toBe("Model Test Get Model");
            expect(outputGetModel.value.category).toBe("Test");
            expect(outputGetModel.value.description).toBe("Model Test Description");
            expect(outputGetModel.value.accuracy).toBe(0.885);
            expect(outputGetModel.value.parameters[0].name).toBe("Attribute 1");
            expect(outputGetModel.value.parameters[0].type).toBe("number");
        }
    }
    await connection.close();
});