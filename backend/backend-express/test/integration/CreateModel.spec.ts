import { PrismaClientAdapter } from "../../src/infra/database/DatabaseConnection";
import ModelRepositoryDatabase from "../../src/infra/repository/ModelRepository";
import CreateModel from "../../src/application/usecase/CreateModel";
import GetModel from "../../src/application/usecase/GetModel";

it("Should create a Machine Learning Model", async () => {
  const connection = new PrismaClientAdapter();

  const modelRepository = new ModelRepositoryDatabase(connection);

  const createModel = new CreateModel(modelRepository);
  const getModel = new GetModel(connection);

  const inputCreateModel = {
    modelName: "Model Test",
    description:'Model Test Description',
    accuracy: 88.5,
    parameters: [
      {
        name: "Atributte 1",
        type: "number",
      },
    ],
    createdAt: new Date(),
  }

  // Creating a model
  const outputCreateModel = await createModel.execute(inputCreateModel);

  // Consulting if the model was created
  expect(outputCreateModel.modelId).toBeDefined();

  // Consulting if the model was created
  const outputGetModel = await getModel.execute(outputCreateModel.modelId);
  expect(outputGetModel.modelId).toBe(outputCreateModel.modelId);
  expect(outputGetModel.modelName).toBe("Model Test");
  expect(outputGetModel.description).toBe("Model Test Description");
  expect(outputGetModel.accuracy).toBe(88.5);
  expect(outputGetModel.parameters[0].name).toBe("Atributte 1");
  expect(outputGetModel.parameters[0].type).toBe("number");

  await connection.close();
});
