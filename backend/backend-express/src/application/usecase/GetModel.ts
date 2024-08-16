import { Either, left, right } from './../errors/either';
import { Parameter } from "../../domain/Model";
import DatabaseConnection from "../ports/database/DatabaseConnection";
import { AppError } from '../errors/AppError.error';
import NotFoundError from '../errors/NotFound.error';


export default class GetModel {
    
    constructor(readonly connection: DatabaseConnection){
    }

    async execute(id: string): Promise<ResponseGetModel>{
        try {
            const model = await this.connection.findUnique(id, 'model');
            if(!model){
                throw left(new NotFoundError(id));
            }
            return right(model);
        } catch (error) {
            return left(new AppError.UnexpectedError());
        }
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

export type ResponseGetModel = Either<
    AppError.UnexpectedError |
    NotFoundError
    ,
    OutputGetModelDto
>;