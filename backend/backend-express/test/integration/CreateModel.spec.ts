import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import ModelRepositoryDatabase from "../../src/infra/repository/ModelRepositoryDatabase";
import ModelRepositoryMemory from "../../src/infra/repository/memory/ModelRepositoryMemory";
import CreateModel from "../../src/application/usecase/CreateModel";
import { typeParameter } from "../../src/domain/Model";

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
  ]
}

it("Should create a Machine Learning Model in memory", async () => {
  const modelRepository = new ModelRepositoryMemory();
  const createModel = new CreateModel(modelRepository);

  // Creating a model
  const outputCreateModel = await createModel.execute(inputCreateModel);

  // Consulting if the model was created
  if(outputCreateModel.isRight()){
    expect(outputCreateModel.value.id).toBeDefined();
  }
});

it("Should create a Machine Learning Model in database", async () => {
  const connection = new PrismaClientAdapter();
  const modelRepository = new ModelRepositoryDatabase(connection);
  const createModel = new CreateModel(modelRepository);

  const outputCreateModel = await createModel.execute(inputCreateModel);

  // Close the connection after database operations
  await connection.close();

  // Consulting if the model was created
  if(outputCreateModel.isRight()){
    expect(outputCreateModel.value.id).toBeDefined();
  }
});

