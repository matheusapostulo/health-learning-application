import { Parameter } from "../../domain/Model";
import DatabaseConnection from "../ports/database/DatabaseConnection";


export default class GetModelsByCategory {
        
        constructor(readonly connection: DatabaseConnection){
        }
    
        async execute(category: string): Promise<OutputGetModelsByCategory[]>{
            const models = await this.connection.findModelByCategory(category);
            if(models.length === 0){
                throw new Error('Any model in this category was found');
            }
            return models;
        }
}

interface OutputGetModelsByCategory {
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