import crypto from 'crypto';
import { Either, left, right } from '../application/errors/either';
import RequiredParametersError from '../application/errors/RequiredParameters.error';
import { CreateModelError } from '../application/errors/CreateModel.error';

export default class Model {
    constructor(
        readonly id: string,
        private modelName: string,
        private category: string,
        private description: string,
        private accuracy: number,
        private parameters: Parameter[],
        private favoritedBy: string[],
        private favoritesCount: number,
        readonly createdAt: Date,
        private updatedAt?: Date
    ) { }

    // Method to create a new model. It's gonna create using the constructor and return a new instance of Model
    static create(modelName:string, category:string, description:string, accuracy:number, parameters:Parameter[]) : ResponseCreateModelDomain{
        // Validation
        if (accuracy < 0 || accuracy > 1) return left(new CreateModelError.InvalidAccuracyError("Accuracy must be between 0 and 1"))
        if (!accuracy) return left(new RequiredParametersError("Accuracy"))
        if (!modelName) return left(new RequiredParametersError("Model Name"))   
        if (!category) return left(new RequiredParametersError("Category"))
        if (!description) return left(new RequiredParametersError("Description"))
        if (parameters.length === 0) return left(new RequiredParametersError("Parameters"))
        if(parameters.some(parameter => !parameter.name)) return left(new RequiredParametersError("Parameter name"))
        if(parameters.some(parameter => !Object.values(typeParameter).includes(parameter.type))) return left(new CreateModelError.InvalidParameterTypeError("Invalid parameter type"))
        // Creating a new model
        const id = crypto.randomUUID();
        const createdAndUpdatedDate = new Date();
        const favoritedBy: string[] = [];
        const favoritesCount = 0;
        return right(new Model(id, modelName, category, description, accuracy, parameters, favoritedBy, favoritesCount, createdAndUpdatedDate, createdAndUpdatedDate));
    }
    
    // Name methods
    getName(){
        return this.modelName;
    }

    updateName(newName: string){
        // Add validation here
        this.modelName = newName;
    }

    // Category methods
    getCategory(){
        return this.category;
    }

    updateCategory(newCategory: string){
        // Add validation here
        this.category = newCategory;
    }

    // Description methods
    getDescription(){
        return this.description;
    }

    updateDescription(newDescription: string){
        // Add validation here
        this.description = newDescription;
    }

    // Accuracy methods
    getAccuracy(){
        return this.accuracy;
    }

    updateAccuracy(newAccuracy: number) : Either<CreateModelError.InvalidAccuracyError, boolean>{
        // Add validation here
        if(newAccuracy < 0 || newAccuracy > 1) return left(new CreateModelError.InvalidAccuracyError("Accuracy must be between 0 and 1"))
        this.accuracy = newAccuracy;
        return right(true);
    }

    // Parameters methods
    getParameters(){
        return this.parameters;
    }

    addParameter(newParameter: Parameter): Either<RequiredParametersError | CreateModelError.InvalidParameterTypeError, boolean>{
        // Add validation here
        if(!newParameter.name) return left(new RequiredParametersError("Parameter name"))
        if(!Object.values(typeParameter).includes(newParameter.type)) return left(new CreateModelError.InvalidParameterTypeError("Invalid parameter type"))
        this.parameters.push(newParameter);
        return right(true);
    }

    removeParameter(parameterName: string){
        // Add validation here
        this.parameters = this.parameters.filter(parameter => parameter.name !== parameterName);
    }

    // Favorites methods
    getFavoritesCount(){
        return this.favoritesCount;
    }

    private incrementFavoritesCount(){
        this.favoritesCount++;
    }

    private decrementFavoritesCount(){
        this.favoritesCount--;
    }

    addFavorite(id: string){
        this.favoritedBy.push(id);
        this.incrementFavoritesCount();
    }

    removeFavorite(id: string){
        this.favoritedBy = this.favoritedBy.filter(favorite => favorite !== id);
        this.decrementFavoritesCount();
    }

    getFavoritedBy(){
        return this.favoritedBy;
    }

    // Data methods
    getCreatedAt(){
        return this.createdAt;
    }

    getUpdatedAt(){
        return this.updatedAt;
    }

    updateUpdateAt(){
        // Add validation here
        const date = new Date();
        this.updatedAt = date;
    }   
}

export type Parameter = {
    name: string;
    type: typeParameter;
}

export enum typeParameter {
    Number = "number",
    String = "string",
    Boolean = "boolean"
}

export type ResponseCreateModelDomain = Either<
    RequiredParametersError |
    CreateModelError.InvalidAccuracyError |
    CreateModelError.InvalidParameterTypeError
    ,
    Model
>;
