import crypto from 'crypto';

export default class Model {
    constructor(readonly modelId:string, readonly modelName:string, readonly description:string, readonly accuracy:number, readonly parameters:Parameter[], readonly createdAt:Date, readonly updatedAt?:Date){ 
    }

    static create(modelName:string, description:string, accuracy:number, parameters:Parameter[]){
        const modelId = crypto.randomUUID();
        const date = new Date();
        return new Model(modelId, modelName, description, accuracy, parameters, date);
    }
}

type Parameter = {
    name: string;
    type: string;
}