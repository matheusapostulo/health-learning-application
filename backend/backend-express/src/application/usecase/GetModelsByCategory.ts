import { Parameter } from "../../domain/Model";
import { AppError } from "../errors/AppError.error";
import { Either, left, right } from "../errors/either";
import NotFoundError from "../errors/NotFound.error";
import DatabaseConnection from "../ports/database/DatabaseConnection";


export default class GetModelsByCategory {
        
        constructor(readonly connection: DatabaseConnection){
        }
    
        async execute(category: string): Promise<ResponseGetModelsByCategory>{
            const models = await this.connection.findModelByCategory(category);
            if(models.length === 0){
                return left(new NotFoundError('Category'));
            }
            return right(models);
        }
}

export interface OutputGetModelsByCategoryDto {
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

export type ResponseGetModelsByCategory = Either<
    AppError.UnexpectedError |
    NotFoundError    
    ,
    OutputGetModelsByCategoryDto[]
>;
