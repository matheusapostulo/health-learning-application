import Model, { typeParameter } from "../../src/domain/Model"

describe("Model unit tests", () => {
    const inputModel = {
        modelName: "model",
        category: "Test",
        description: "description",
        accuracy: 0.9,
        parameters: [
            {
                name: "parameter",
                type: typeParameter.Number
            }
        ]
    }
    it("Should create a model", () => {
        
        const model = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, inputModel.parameters)    
        expect(model.modelId).toBeDefined()
        expect(model.getName()).toBe(inputModel.modelName)
        expect(model.getDescription()).toBe(inputModel.description)
        expect(model.getAccuracy()).toBe(inputModel.accuracy)
        expect(model.getParameters()).toBe(inputModel.parameters)
        expect(model.getCreatedAt()).toBeDefined()
        expect(model.getUpdatedAt()).toBeDefined()
        expect(model.getCreatedAt()).toBe(model.getUpdatedAt())
    })

    describe("Model throw errors when create", () => {
        it("Shouldn't create a model with parameters type different from the enum", () => {
            expect(() => {
                Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "parameter", type: "none"}])
            }).toThrow("Invalid parameter type")
        })

        it("Shouldn't create a model with a empty parameter name", () => {
            expect(() => {
                Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "", type: typeParameter.Number}])
            }).toThrow("Parameter name is required")
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
    });
    
    describe("Model update tests", () => {
        const model = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "parameter", type: typeParameter.Number}])
        it("Should update the model name", () => {
            model.updateName("new name")
            expect(model.getName()).toBe("new name")
        })
        it("Should update the model description", () => {
            model.updateDescription("new description")
            expect(model.getDescription()).toBe("new description")
        })
        it("Should update the model category", () => {
            model.updateCategory("new category")
            expect(model.getCategory()).toBe("new category")
        })
        it("Should update the model accuracy", () => { 
            model.updateAccuracy(0.8)
            expect(model.getAccuracy()).toBe(0.8)
        })
        it("Shouldn't update the model accuracy with invalid value", () => {
            expect(() => {
                model.updateAccuracy(-1)
            }).toThrow("Accuracy must be between 0 and 1")
            expect(() => {
                model.updateAccuracy(1.1)
            }).toThrow("Accuracy must be between 0 and 1")
        })
        it("Should add a parameter to the model", () => {
            model.addParameter({name: "new parameter 2", type: typeParameter.String})
            expect(model.getParameters()).toStrictEqual([{name: "parameter", type: typeParameter.Number},  {name: "new parameter 2", type: typeParameter.String}])
        })
        it("Shouldn't update the model parameters with invalid type", () => {
            expect(() => {
                model.addParameter({name: "new parameter 3", type: "none"})
            }).toThrow("Invalid parameter type")
        })
        it("Should add a id user to favoritedBy and changes favoritesCount", () => {
            model.addFavorite("id")
            expect(model.getFavoritedBy()).toStrictEqual(["id"])
            expect(model.getFavoritesCount()).toBe(1)
        })
        it("Should update the model updatedAt", () => {
            model.updateUpdateAt()
            expect(model.getUpdatedAt()).not.toBe(model.getCreatedAt())
        })
    });
    
    describe("Remove tests", () => {
        const model = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "parameter", type: typeParameter.Number}, {name: "parameter 2", type: typeParameter.Number}])
        it("Should remove a parameter from the model", () => {
            model.removeParameter("parameter 2")
            expect(model.getParameters()).toStrictEqual([{name: "parameter", type: typeParameter.Number}])
        });
        it("Should remove a id user from favoritedBy and changes favoritesCount", () => {
            model.addFavorite("id")
            expect(model.getFavoritedBy()).toStrictEqual(["id"])
            model.removeFavorite("id")
            expect(model.getFavoritedBy()).toStrictEqual([])
            expect(model.getFavoritesCount()).toBe(0)
        });
    });

})