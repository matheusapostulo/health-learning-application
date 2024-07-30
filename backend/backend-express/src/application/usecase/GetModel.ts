import { Parameter } from "../../domain/Model";
import DatabaseConnection from "../../infra/database/DatabaseConnection";

export default class GetModel {
    
    constructor(readonly connection: DatabaseConnection){
    }

    async execute(modelId: string): Promise<OutputGetModel>{
        const model = await this.connection.findUnique(modelId);
        if(!model){
            throw new Error('Model not found');
        }
        return model;
    }
}

interface OutputGetModel {
    modelId: string;
    modelName: string;
    category: string;
    description: string;
    accuracy: number;
    parameters: Parameter[];
    createdAt: Date;
    updatedAt?: Date;
}