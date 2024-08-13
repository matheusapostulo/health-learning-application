import Model, { Parameter } from "../../domain/Model";
import ModelRepository from "../repository/ModelRepository";


export default class CreateModel {
    
    constructor(readonly modelRepository: ModelRepository){
    }

    async execute(input: InputCreateModelDto): Promise<OutputCreateModelDto>{
        const model = Model.create(input.modelName, input.category, input.description, input.accuracy, input.parameters);
        await this.modelRepository.saveModel(model);
        return {
            id: model.id
        };
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