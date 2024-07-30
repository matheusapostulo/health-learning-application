import Model from "../../src/domain/Model"

describe("Model unit tests", () => {
    const inputModel = {
        modelName: "model",
        category: "Test",
        description: "description",
        accuracy: 0.9,
        parameters: [
            {
                name: "parameter",
                type: "type"
            }
        ]
    }
    it("Should create a model", () => {
        
        const model = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, inputModel.parameters)    
        expect(model.modelId).toBeDefined()
        expect(model.modelName).toBe(inputModel.modelName)
        expect(model.description).toBe(inputModel.description)
        expect(model.accuracy).toBe(inputModel.accuracy)
        expect(model.parameters).toBe(inputModel.parameters)
        expect(model.createdAt).toBeDefined()
        expect(model.updatedAt).toBeUndefined()
    })

    it("Shouldn't create a model with an accuracy of less than 0 and greater than 1", () => {
        expect(() => {
            Model.create(inputModel.modelName, inputModel.category, inputModel.description, -1, inputModel.parameters)
        }).toThrow("Accuracy must be between 0 and 1")
        expect(() => {
            Model.create(inputModel.modelName, inputModel.category, inputModel.description, 1.1, inputModel.parameters)
        }).toThrow("Accuracy must be between 0 and 1")
    })

    it("Shouldn't create a model without a model name", () => {
        expect(() => {
            Model.create("", inputModel.category, inputModel.description, inputModel.accuracy, inputModel.parameters)
        }).toThrow("ModelName is required")
    })

    it("Shouldn't create a model without a description", () => {
        expect(() => {
            Model.create(inputModel.modelName, inputModel.category, "", inputModel.accuracy, inputModel.parameters)
        }).toThrow("Description is required")
    })

    it("Shouldn't create a model without parameters", () => {
        expect(() => {
            Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [])
        }).toThrow("Parameters is required")
    })  

    it("'Shouldn't create a model without a category", () => { 
        expect(() => {
            Model.create(inputModel.modelName, "", inputModel.description, inputModel.accuracy, inputModel.parameters)
        }).toThrow("Category is required")
    })
})