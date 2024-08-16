import { CreateModelError } from "../../src/application/errors/CreateModel.error"
import Model, { typeParameter } from "../../src/domain/Model"
import RequiredParametersError from '../../src/application/errors/RequiredParameters.error';

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
        const modelOrError = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, inputModel.parameters)    
        if(modelOrError.isRight()){
            expect(modelOrError.value.id).toBeDefined()
            expect(modelOrError.value.getName()).toBe(inputModel.modelName)
            expect(modelOrError.value.getDescription()).toBe(inputModel.description)
            expect(modelOrError.value.getAccuracy()).toBe(inputModel.accuracy)
            expect(modelOrError.value.getParameters()).toBe(inputModel.parameters)
            expect(modelOrError.value.getCreatedAt()).toBeDefined()
            expect(modelOrError.value.getUpdatedAt()).toBeDefined()
            expect(modelOrError.value.getCreatedAt()).toBe(modelOrError.value.getUpdatedAt())
        }
    })

    describe("Model throw errors when create", () => {
        it("Shouldn't create a model with parameters type different from the enum", () => {
            const modelOrError = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "parameter", type: "none"}])
            if(modelOrError.isLeft()){
                expect(modelOrError.value).toBeInstanceOf(CreateModelError.InvalidParameterTypeError)
            }
        })

        it("Shouldn't create a model with a empty parameter name", () => {
            const modelOrError = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "", type: typeParameter.Number}])
            if(modelOrError.isLeft()){
                expect(modelOrError.value).toBeInstanceOf(RequiredParametersError)
            }
        })
    
        it("Shouldn't create a model with an accuracy of less than 0 and greater than 1", () => {
            const modelOrErrorLessThan1 = Model.create(inputModel.modelName, inputModel.category, inputModel.description, -1, inputModel.parameters)
            const modelOrErrorMoreThan1 = Model.create(inputModel.modelName, inputModel.category, inputModel.description, 1.1, inputModel.parameters)
            
            if(modelOrErrorLessThan1.isLeft()){
                expect(modelOrErrorLessThan1.value).toBeInstanceOf(CreateModelError.InvalidAccuracyError)
            }
            if(modelOrErrorMoreThan1.isLeft()){
                expect(modelOrErrorMoreThan1.value).toBeInstanceOf(CreateModelError.InvalidAccuracyError)
            }
        })
    
        it("Shouldn't create a model without a model name", () => {
            const modelOrError = Model.create("", inputModel.category, inputModel.description, inputModel.accuracy, inputModel.parameters)
            if(modelOrError.isLeft()){
                expect(modelOrError.value).toBeInstanceOf(RequiredParametersError)
            }
        })
    
        it("Shouldn't create a model without a description", () => {
            const modelOrError = Model.create(inputModel.modelName, inputModel.category, "", inputModel.accuracy, inputModel.parameters)
            if(modelOrError.isLeft()){
                expect(modelOrError.value).toBeInstanceOf(RequiredParametersError)
            }
        })
    
        it("Shouldn't create a model without parameters", () => {
            const modelOrError = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [])
            if(modelOrError.isLeft()){
                expect(modelOrError.value).toBeInstanceOf(RequiredParametersError)
            }
        })  
        
        it("'Shouldn't create a model without a category", () => { 
            const modelOrError = Model.create(inputModel.modelName, "", inputModel.description, inputModel.accuracy, inputModel.parameters)
            if(modelOrError.isLeft()){
                expect(modelOrError.value).toBeInstanceOf(RequiredParametersError)
            }
        })
    });
    
    describe("Model update tests", () => {
        const modelOrError = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "parameter", type: typeParameter.Number}])
        if(modelOrError.isRight()){
            const model: Model = modelOrError.value;

            it("Should update the model name", () => {
                model.updateName("new name")
                expect(model.getName()).toBe("new name")
            });

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
                const updateAccuracyLessThan1 = model.updateAccuracy(-1)
                const updateAccuracyMoreThan1 = model.updateAccuracy(1.1)
                if(updateAccuracyLessThan1.isLeft()){
                    expect(updateAccuracyLessThan1.value).toBeInstanceOf(CreateModelError.InvalidAccuracyError)
                }
                if(updateAccuracyMoreThan1.isLeft()){
                    expect(updateAccuracyMoreThan1.value).toBeInstanceOf(CreateModelError.InvalidAccuracyError)
                }
            })
            it("Should add a parameter to the model", () => {
                model.addParameter({name: "new parameter 2", type: typeParameter.String})
                expect(model.getParameters()).toStrictEqual([{name: "parameter", type: typeParameter.Number},  {name: "new parameter 2", type: typeParameter.String}])
            })
            it("Shouldn't update the model parameters with invalid type", () => {
                const addParameter = model.addParameter({name: "new parameter 3", type: "none"})
                if(addParameter.isLeft()){
                    expect(addParameter.value).toBeInstanceOf(CreateModelError.InvalidParameterTypeError);
                }
            })
            it("Should add a id user to favoritedBy and changes favoritesCount", () => {
                model.addFavorite("id")
                expect(model.getFavoritedBy()).toStrictEqual(["id"])
                expect(model.getFavoritesCount()).toBe(1)
            })
            it("Should update the model updatedAt", () => {
                model.updateUpdateAt()
                expect(model.getUpdatedAt()).not.toBe(modelOrError.value.getCreatedAt())
            })
        }
    });
    
    describe("Remove tests", () => {
        const modelOrError = Model.create(inputModel.modelName, inputModel.category, inputModel.description, inputModel.accuracy, [{name: "parameter", type: typeParameter.Number}, {name: "parameter 2", type: typeParameter.Number}])
        if(modelOrError.isRight()){
            const model: Model = modelOrError.value;

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
        }
    });

})