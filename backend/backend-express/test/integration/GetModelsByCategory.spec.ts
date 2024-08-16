import NotFoundError from "../../src/application/errors/NotFound.error";
import CreateModel from "../../src/application/usecase/CreateModel";
import GetModelsByCategory from "../../src/application/usecase/GetModelsByCategory";
import Model, { typeParameter } from "../../src/domain/Model";
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
        type: typeParameter.Boolean,
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
        type: typeParameter.Boolean,
      },
    ],
    createdAt: new Date(),
  }

  const connection = new DatabaseConnectionMemory();
  
  const getModelsByCategory = new GetModelsByCategory(connection);

  const model1 = Model.create(inputCreateModel1.modelName, inputCreateModel1.category, inputCreateModel1.description, inputCreateModel1.accuracy, inputCreateModel1.parameters);
  const model2 = Model.create(inputCreateModel2.modelName, inputCreateModel2.category, inputCreateModel2.description, inputCreateModel2.accuracy, inputCreateModel2.parameters);
  if(model1.isRight() && model2.isRight()){
    await connection.create(model1.value);
    await connection.create(model2.value);
  }

  const outputGetModelsByCategory = await getModelsByCategory.execute('Test Category in Memory');

  if(outputGetModelsByCategory.isRight()){
    expect(outputGetModelsByCategory.value.length).toBe(2);
    outputGetModelsByCategory.value.forEach((model) => {
      expect(model.category).toBe('Test Category in Memory');
    });
  }

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
        type: typeParameter.Number,
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
        type: typeParameter.Number,
      },
    ],
    createdAt: new Date(),
  }
  const connection = new PrismaClientAdapter();
  const getModelsByCategory = new GetModelsByCategory(connection);
  const modelRepository = new ModelRepositoryDatabase(connection);
  const createModel = new CreateModel(modelRepository);

  await createModel.execute(inputCreateModel1);
  await createModel.execute(inputCreateModel2);
  
  // Consulting if the model was created
  const outputGetModelsByCategory = await getModelsByCategory.execute('Test Category Database');

  if(outputGetModelsByCategory.isRight()){
    outputGetModelsByCategory.value.forEach((model) => {
      expect(model.category).toBe('Test Category Database');
    });
  }
  
  await connection.close();
});


it("Should get a error when try to get a Machine Learning Model's by category that does not exist in database", async () => {
  const connection = new PrismaClientAdapter();
  const getModelsByCategory = new GetModelsByCategory(connection);

  // Consulting if the model was created
  const outputGetModelsByCategory = await getModelsByCategory.execute('Test Category Database');

  if(outputGetModelsByCategory.isLeft()){
    expect(outputGetModelsByCategory.value).toBeInstanceOf(NotFoundError);
  }
  
  await connection.close();
});