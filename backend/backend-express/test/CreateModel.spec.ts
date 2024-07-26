import CreateModel from "../src/usecase/CreateModel";
import GetModel from "../src/usecase/GetModel";

it("Should create a Machine Learning Model", async () => {
  // Given
  const createModel = new CreateModel();
  const getModel = new GetModel;

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

  // When 
  // Creating a model
  const outputCreateModel = await createModel.execute(inputCreateModel);

  // Consulting if the model was created
  const outputGetModel = await getModel.execute(outputCreateModel.modelName);

  // Then
  expect(outputCreateModel.modelName).toBeDefined();

  expect(outputGetModel.modelName).toBe("Model Test");
  expect(outputGetModel.description).toBe("Model Test Description");
  expect(outputGetModel.accuracy).toBe(88.5);
  expect(outputGetModel.parameters[0].name).toBe("Atributte 1");
  expect(outputGetModel.parameters[0].type).toBe("number");
});

it("Should not find a Machine Learning Model", async () => {
  const getModel = new GetModel();

  await expect(getModel.execute("Any Invalid Model")).rejects.toThrow('Model not found');

});
