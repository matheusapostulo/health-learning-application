import { Parameter } from "../../domain/Model";
import DatabaseConnection from "../ports/database/DatabaseConnection";


export default class GetModel {
    
    constructor(readonly connection: DatabaseConnection){
    }

    async execute(id: string): Promise<OutputGetModelDto>{
        const model = await this.connection.findUnique(id, 'model');
        if(!model){
            throw new Error('Model not found');
        }
        return model;
    }
}

export interface OutputGetModelDto {
    id: string;
    modelName: string;
    category: string;
    description: string;
    accuracy: number;
    parameters: Parameter[];
    favoritedBy: string[];
    favoritesCount: number;
    createdAt: Date;
    updatedAt?: Date;
}