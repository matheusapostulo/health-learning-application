import crypto from 'crypto';

export default class Model {
    constructor(readonly modelId:string, readonly modelName:string, readonly category:string, readonly description:string, readonly accuracy:number, readonly parameters:Parameter[], readonly createdAt:Date, readonly updatedAt?:Date){ 
        if(!accuracy){
            throw new Error("Accuracy is required")
        }
        if(accuracy < 0 || accuracy > 1){
            throw new Error("Accuracy must be between 0 and 1")
        }
        if(!modelId){
            throw new Error("ModelId is required")
        }
        if(!modelName){
            throw new Error("ModelName is required")
        }
        if(!category){
            throw new Error("Category is required")
        }
        if(!description){
            throw new Error("Description is required")
        }
        if(parameters.length === 0){
            throw new Error("Parameters is required")
        }
    }

    static create(modelName:string, category:string, description:string, accuracy:number, parameters:Parameter[]){
        const modelId = crypto.randomUUID();
        const date = new Date();
        return new Model(modelId, modelName, category, description, accuracy, parameters, date);
    }
}

type Parameter = {
    name: string;
    type: string;
}