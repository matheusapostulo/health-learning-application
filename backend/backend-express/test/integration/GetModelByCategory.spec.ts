import CreateModel from "../../src/application/usecase/CreateModel";
import GetModelByCategory from "../../src/application/usecase/GetModelByCategory";
import Model from "../../src/domain/Model";
import DatabaseConnectionMemory from "../../src/infra/database/memory/DatabaseConnectionMemory";
import { PrismaClientAdapter } from "../../src/infra/database/PrismaClientAdapter";
import ModelRepositoryDatabase from "../../src/infra/repository/ModelRepositoryDatabase";


it("Should get Machine Learning Model's by category in memory", async () => {
  const inputCreateModel1 = {
    modelName: "Model Test 1",
    description:'Model Test Description 1',
    category: 'Test Category in Memory',
    accuracy: 0.880,
    parameters: [
      {
        name: "Attribute 1",
        type: "number",
      },
    ],
    createdAt: new Date(),
  }
  
  const inputCreateModel2 = {
    modelName: "Model Test 2",
    description:'Model Test Description 2',
    category: 'Test Category in Memory',
    accuracy: 0.885,
    parameters: [
      {
        name: "Attribute 1",
        type: "number",
      },
    ],
    createdAt: new Date(),
  }

  const connection = new DatabaseConnectionMemory();
  
  const getModelByCategory = new GetModelByCategory(connection);

  const model1 = Model.create(inputCreateModel1.modelName, inputCreateModel1.category, inputCreateModel1.description, inputCreateModel1.accuracy, inputCreateModel1.parameters);
  const model2 = Model.create(inputCreateModel2.modelName, inputCreateModel2.category, inputCreateModel2.description, inputCreateModel2.accuracy, inputCreateModel2.parameters);
  await connection.create(model1);
  await connection.create(model2);

  const outputGetModelByCategory = await getModelByCategory.execute('Test Category in Memory');

  expect(outputGetModelByCategory.length).toBe(2);
  outputGetModelByCategory.forEach((model) => {
    expect(model.category).toBe('Test Category in Memory');
  });

});

it("Should get Machine Learning Model's by category in database", async () => {
  const inputCreateModel1 = {
    modelName: "Model Test 1",
    description:'Model Test Description 1',
    category: 'Test Category Database',
    accuracy: 0.880,
    parameters: [
      {
        name: "Attribute 1",
        type: "number",
      },
    ],
    createdAt: new Date(),
  }
  
  const inputCreateModel2 = {
    modelName: "Model Test 2",
    description:'Model Test Description 2',
    category: 'Test Category Database',
    accuracy: 0.885,
    parameters: [
      {
        name: "Attribute 1",
        type: "number",
      },
    ],
    createdAt: new Date(),
  }
  const connection = new PrismaClientAdapter();
  const getModelByCategory = new GetModelByCategory(connection);
  const modelRepository = new ModelRepositoryDatabase(connection);
  const createModel = new CreateModel(modelRepository);

  await createModel.execute(inputCreateModel1);
  await createModel.execute(inputCreateModel2);
  
  // Consulting if the model was created
  const outputGetModelByCategory = await getModelByCategory.execute('Test Category Database');

  outputGetModelByCategory.forEach((model) => {
    expect(model.category).toBe('Test Category Database');
  });
  connection.close();
});