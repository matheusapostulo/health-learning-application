import crypto from 'crypto';

export default class Model {
    constructor(
        readonly modelId: string,
        private modelName: string,
        private category: string,
        private description: string,
        private accuracy: number,
        private parameters: Parameter[],
        private favoritedBy: string[],
        private favoritesCount: number,
        readonly createdAt: Date,
        private updatedAt?: Date
    ) { 
        // Validation
        if (!accuracy) throw new Error("Accuracy is required")
        if (accuracy < 0 || accuracy > 1) throw new Error("Accuracy must be between 0 and 1")
        if (!modelId) throw new Error("ModelId is required")
        if (!modelName) throw new Error("ModelName is required")
        if (!category) throw new Error("Category is required")
        if (!description) throw new Error("Description is required")
        if (parameters.length === 0) throw new Error("Parameters is required")
        if(parameters.some(parameter => !parameter.name)) throw new Error("Parameter name is required")
        if(parameters.some(parameter => !Object.values(typeParameter).includes(parameter.type))) throw new Error("Invalid parameter type")
    }

    // Method to create a new model. It's gonna create using the constructor and return a new instance of Model
    static create(modelName:string, category:string, description:string, accuracy:number, parameters:Parameter[]){
        const modelId = crypto.randomUUID();
        const createdAndUpdatedDate = new Date();
        const favoritedBy: string[] = [];
        const favoritesCount = 0;
        return new Model(modelId, modelName, category, description, accuracy, parameters, favoritedBy, favoritesCount, createdAndUpdatedDate, createdAndUpdatedDate);
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

    updateAccuracy(newAccuracy: number){
        // Add validation here
        if(newAccuracy < 0 || newAccuracy > 1) throw new Error("Accuracy must be between 0 and 1")
        this.accuracy = newAccuracy;
    }

    // Parameters methods
    getParameters(){
        return this.parameters;
    }

    addParameter(newParameter: Parameter){
        // Add validation here
        if(!newParameter.name) throw new Error("Parameter name is required")
        if(!Object.values(typeParameter).includes(newParameter.type)) throw new Error("Invalid parameter type")
        this.parameters.push(newParameter);
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

    addFavorite(userId: string){
        this.favoritedBy.push(userId);
        this.incrementFavoritesCount();
    }

    removeFavorite(userId: string){
        this.favoritedBy = this.favoritedBy.filter(favorite => favorite !== userId);
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