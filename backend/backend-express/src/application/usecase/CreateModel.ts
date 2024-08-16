import Model, { Parameter } from "../../domain/Model";
import { AppError } from "../errors/AppError.error";
import { CreateModelError } from "../errors/CreateModel.error";
import { Either, left, right } from "../errors/either";
import RequiredParametersError from "../errors/RequiredParameters.error";
import ModelRepository from "../repository/ModelRepository";


export default class CreateModel {
    
    constructor(readonly modelRepository: ModelRepository){
    }

    async execute(input: InputCreateModelDto): Promise<ResponseCreateModel>{
        try {
            const modelOrError = Model.create(input.modelName, input.category, input.description, input.accuracy, input.parameters);
            if(modelOrError.isLeft()){
                return left(modelOrError.value);
            }
            const model: Model = modelOrError.value;
            await this.modelRepository.saveModel(model);
            return right({
                id: model.id
            });
        } catch (error) {
            return left(new AppError.UnexpectedError());
        }
    }
}

export interface InputCreateModelDto {
    modelName: string;
    category: string;
    description: string;
    accuracy: number;
    parameters: Parameter[];
}

export interface OutputCreateModelDto {
    id: string;
}

export type ResponseCreateModel = Either<
    CreateModelError.InvalidAccuracyError |
    CreateModelError.InvalidParameterTypeError |
    RequiredParametersError |
    AppError.UnexpectedError
    ,
    OutputCreateModelDto
>;